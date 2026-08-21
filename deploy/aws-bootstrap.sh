#!/usr/bin/env bash
# Creates the AWS infrastructure this site runs on. Idempotent: re-running it
# reuses anything that already exists rather than erroring.
#
#   ./deploy/aws-bootstrap.sh
#
# Requires: an authenticated AWS profile with permission to create ECR/IAM/EC2/S3.
#   aws sso login --profile "$AWS_PROFILE"
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-kroger}"
AWS_REGION="${AWS_REGION:-us-east-1}"
GITHUB_REPO="${GITHUB_REPO:-kurieu-mx/portfolio}"
DOMAIN="${DOMAIN:-eugeniokuri.com}"
ECR_REPO="${ECR_REPO:-portfolio}"
INSTANCE_TYPE="${INSTANCE_TYPE:-t3a.micro}"
NAME="${NAME:-portfolio}"

aws() { command aws --profile "$AWS_PROFILE" --region "$AWS_REGION" "$@"; }
say() { printf '\n=== %s\n' "$*"; }

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
say "account ${ACCOUNT_ID} · region ${AWS_REGION}"

# --------------------------------------------------------------------------
say "ECR repository"
aws ecr describe-repositories --repository-names "$ECR_REPO" >/dev/null 2>&1 \
  || aws ecr create-repository \
       --repository-name "$ECR_REPO" \
       --image-scanning-configuration scanOnPush=true \
       --image-tag-mutability MUTABLE >/dev/null
echo "ecr: ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"

# Expire untagged layers so old builds do not accumulate storage cost.
aws ecr put-lifecycle-policy --repository-name "$ECR_REPO" --lifecycle-policy-text '{
  "rules": [{
    "rulePriority": 1,
    "description": "expire untagged images after 14 days",
    "selection": {"tagStatus": "untagged", "countType": "sinceImagePushed",
                  "countUnit": "days", "countNumber": 14},
    "action": {"type": "expire"}
  }]
}' >/dev/null

# --------------------------------------------------------------------------
say "S3 bucket for deploy artifacts"
BUCKET="${NAME}-deploy-${ACCOUNT_ID}"
if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  aws s3api create-bucket --bucket "$BUCKET" >/dev/null
  aws s3api put-public-access-block --bucket "$BUCKET" \
    --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
  aws s3api put-bucket-encryption --bucket "$BUCKET" \
    --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
fi
echo "bucket: ${BUCKET}"

# --------------------------------------------------------------------------
say "GitHub OIDC provider"
OIDC_ARN="arn:aws:iam::${ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$OIDC_ARN" >/dev/null 2>&1 \
  || aws iam create-open-id-connect-provider \
       --url https://token.actions.githubusercontent.com \
       --client-id-list sts.amazonaws.com \
       --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 >/dev/null
echo "oidc: ${OIDC_ARN}"

# --------------------------------------------------------------------------
say "IAM role for GitHub Actions"
GH_ROLE="${NAME}-github-actions"
# The trust policy pins the repository, so a fork cannot assume this role.
#
# Both subject forms are required. A job that declares `environment:` gets an
# OIDC token whose sub is "repo:<repo>:environment:<name>" -- NOT the
# "ref:refs/heads/main" form. Listing only the ref form fails the deploy job
# with "Not authorized to perform sts:AssumeRoleWithWebIdentity".
cat > /tmp/gh-trust.json <<JSON
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Federated": "${OIDC_ARN}"},
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {"token.actions.githubusercontent.com:aud": "sts.amazonaws.com"},
      "StringLike": {"token.actions.githubusercontent.com:sub": [
        "repo:${GITHUB_REPO}:ref:refs/heads/main",
        "repo:${GITHUB_REPO}:environment:production"
      ]}
    }
  }]
}
JSON
if aws iam get-role --role-name "$GH_ROLE" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$GH_ROLE" \
    --policy-document file:///tmp/gh-trust.json
else
  aws iam create-role --role-name "$GH_ROLE" \
    --assume-role-policy-document file:///tmp/gh-trust.json >/dev/null
fi

cat > /tmp/gh-policy.json <<JSON
{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect": "Allow", "Action": "ecr:GetAuthorizationToken", "Resource": "*"},
    {"Effect": "Allow",
     "Action": ["ecr:BatchCheckLayerAvailability","ecr:CompleteLayerUpload",
                "ecr:InitiateLayerUpload","ecr:PutImage","ecr:UploadLayerPart",
                "ecr:BatchGetImage","ecr:GetDownloadUrlForLayer"],
     "Resource": "arn:aws:ecr:${AWS_REGION}:${ACCOUNT_ID}:repository/${ECR_REPO}"},
    {"Effect": "Allow", "Action": ["s3:PutObject","s3:DeleteObject","s3:ListBucket","s3:GetObject"],
     "Resource": ["arn:aws:s3:::${BUCKET}","arn:aws:s3:::${BUCKET}/*"]},
    {"Effect": "Allow", "Action": ["ssm:SendCommand"],
     "Resource": ["arn:aws:ssm:${AWS_REGION}::document/AWS-RunShellScript",
                  "arn:aws:ec2:${AWS_REGION}:${ACCOUNT_ID}:instance/*"]},
    {"Effect": "Allow", "Action": ["ssm:GetCommandInvocation","ssm:ListCommandInvocations"],
     "Resource": "*"}
  ]
}
JSON
aws iam put-role-policy --role-name "$GH_ROLE" \
  --policy-name "${NAME}-deploy" --policy-document file:///tmp/gh-policy.json
GH_ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${GH_ROLE}"
echo "role: ${GH_ROLE_ARN}"

# --------------------------------------------------------------------------
say "IAM instance profile for EC2"
EC2_ROLE="${NAME}-instance"
aws iam get-role --role-name "$EC2_ROLE" >/dev/null 2>&1 || aws iam create-role --role-name "$EC2_ROLE" \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",
    "Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
for arn in arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore \
           arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly; do
  aws iam attach-role-policy --role-name "$EC2_ROLE" --policy-arn "$arn"
done
aws iam put-role-policy --role-name "$EC2_ROLE" --policy-name "${NAME}-read-deploy-bucket" \
  --policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",
    \"Action\":[\"s3:GetObject\",\"s3:ListBucket\"],
    \"Resource\":[\"arn:aws:s3:::${BUCKET}\",\"arn:aws:s3:::${BUCKET}/*\"]}]}"
aws iam get-instance-profile --instance-profile-name "$EC2_ROLE" >/dev/null 2>&1 || {
  aws iam create-instance-profile --instance-profile-name "$EC2_ROLE" >/dev/null
  aws iam add-role-to-instance-profile --instance-profile-name "$EC2_ROLE" --role-name "$EC2_ROLE"
  sleep 10   # instance profiles take a moment to propagate
}

# --------------------------------------------------------------------------
say "security group"
VPC_ID="$(aws ec2 describe-vpcs --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)"
SG_ID="$(aws ec2 describe-security-groups --filters "Name=group-name,Values=${NAME}-web" \
  "Name=vpc-id,Values=${VPC_ID}" --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo None)"
if [ "$SG_ID" = "None" ] || [ -z "$SG_ID" ]; then
  SG_ID="$(aws ec2 create-security-group --group-name "${NAME}-web" \
    --description "HTTP/HTTPS for ${DOMAIN}" --vpc-id "$VPC_ID" --query GroupId --output text)"
  # Only 80 and 443. Port 22 is deliberately absent: shell access is via SSM.
  for port in 80 443; do
    aws ec2 authorize-security-group-ingress --group-id "$SG_ID" \
      --ip-permissions "IpProtocol=tcp,FromPort=${port},ToPort=${port},IpRanges=[{CidrIp=0.0.0.0/0}],Ipv6Ranges=[{CidrIpv6=::/0}]" >/dev/null
  done
fi
echo "sg: ${SG_ID}"

# --------------------------------------------------------------------------
say "EC2 instance"
INSTANCE_ID="$(aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=${NAME}" "Name=instance-state-name,Values=pending,running,stopped" \
  --query 'Reservations[0].Instances[0].InstanceId' --output text 2>/dev/null || echo None)"

if [ "$INSTANCE_ID" = "None" ] || [ -z "$INSTANCE_ID" ]; then
  AMI_ID="$(aws ssm get-parameters \
    --names /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \
    --query 'Parameters[0].Value' --output text)"
  cat > /tmp/user-data.sh <<'USERDATA'
#!/bin/bash
set -eux
dnf update -y
dnf install -y docker
# The compose plugin is not packaged for AL2023; install the binary.
mkdir -p /usr/local/lib/docker/cli-plugins
curl -fsSL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
systemctl enable --now docker
mkdir -p /opt/portfolio
USERDATA
  INSTANCE_ID="$(aws ec2 run-instances \
    --image-id "$AMI_ID" --instance-type "$INSTANCE_TYPE" \
    --iam-instance-profile "Name=${EC2_ROLE}" \
    --security-group-ids "$SG_ID" \
    --metadata-options "HttpTokens=required,HttpEndpoint=enabled" \
    --block-device-mappings 'DeviceName=/dev/xvda,Ebs={VolumeSize=20,VolumeType=gp3,Encrypted=true}' \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=${NAME}}]" \
    --user-data file:///tmp/user-data.sh \
    --query 'Instances[0].InstanceId' --output text)"
  aws ec2 wait instance-running --instance-ids "$INSTANCE_ID"
fi
echo "instance: ${INSTANCE_ID}"

# --------------------------------------------------------------------------
say "elastic IP"
EIP="$(aws ec2 describe-addresses --filters "Name=tag:Name,Values=${NAME}" \
  --query 'Addresses[0].PublicIp' --output text 2>/dev/null || echo None)"
if [ "$EIP" = "None" ] || [ -z "$EIP" ]; then
  ALLOC_ID="$(aws ec2 allocate-address --domain vpc \
    --tag-specifications "ResourceType=elastic-ip,Tags=[{Key=Name,Value=${NAME}}]" \
    --query AllocationId --output text)"
  aws ec2 associate-address --instance-id "$INSTANCE_ID" --allocation-id "$ALLOC_ID" >/dev/null
  EIP="$(aws ec2 describe-addresses --allocation-ids "$ALLOC_ID" --query 'Addresses[0].PublicIp' --output text)"
fi

# --------------------------------------------------------------------------
cat <<SUMMARY

================================================================
 Done. Set these as GitHub repository VARIABLES
 (Settings -> Secrets and variables -> Actions -> Variables):

   AWS_ROLE_ARN          ${GH_ROLE_ARN}
   DEPLOY_BUCKET         ${BUCKET}
   EC2_INSTANCE_ID       ${INSTANCE_ID}
   NEXT_PUBLIC_SITE_URL  https://${DOMAIN}

 Cloudflare DNS -> A  @  ${EIP}   (DNS only / grey cloud)
                   CNAME www  ${DOMAIN}  (DNS only)

 Then seed the server once:
   aws ssm start-session --target ${INSTANCE_ID} --profile ${AWS_PROFILE} --region ${AWS_REGION}
   sudo mkdir -p /opt/portfolio && sudo tee /opt/portfolio/.env <<EOF
   IMAGE=${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest
   SITE_DOMAIN=${DOMAIN}
   EOF
================================================================
SUMMARY
