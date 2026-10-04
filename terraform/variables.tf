variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Prefijo para nombrar los recursos"
  type        = string
  default     = "serverless-app"
}

variable "artifacts_bucket" {
  description = "Bucket (ya existente) donde se sube el .zip de la Lambda"
  type        = string
}

variable "lambda_memory_mb" {
  description = "Memoria de la Lambda (más memoria = más CPU = arranque más rápido)"
  type        = number
  default     = 2048
}

variable "lambda_timeout_seconds" {
  description = "Tiempo máximo de ejecución (API Gateway corta a los 30 s)"
  type        = number
  default     = 30
}

# Secretos: NO se escriben en ningún archivo.
# Llegan desde GitHub Secrets como TF_VAR_database_url y TF_VAR_jwt_secret
variable "database_url" {
  description = "URL JDBC de Supabase"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Clave para firmar los JWT"
  type        = string
  sensitive   = true
}