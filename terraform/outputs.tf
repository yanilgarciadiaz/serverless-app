output "api_url" {
  description = "URL base de API Gateway"
  value       = aws_apigatewayv2_api.http.api_endpoint
}

output "mobile_base_url" {
  description = "Esta es la URL que va en la app móvil (api.js)"
  value       = "${aws_apigatewayv2_api.http.api_endpoint}/api"
}

output "lambda_function_name" {
  value = aws_lambda_function.api.function_name
}

output "uploads_bucket" {
  value = aws_s3_bucket.uploads.bucket
}

output "log_group" {
  value = aws_cloudwatch_log_group.lambda.name
}