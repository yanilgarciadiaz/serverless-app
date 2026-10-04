terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # El estado se guarda en S3 para que GitHub Actions recuerde lo que ya creó
  backend "s3" {
    bucket       = "amzn-s3-ygarcia-2026"
    key          = "serverless-app/terraform.tfstate"
    region       = "us-east-2"
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region
}