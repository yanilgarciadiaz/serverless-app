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

output "sns_topic_arn" {
  value = aws_sns_topic.notifications.arn
}

output "sqs_queue_url" {
  value = aws_sqs_queue.notifications.id
}

output "sqs_queue_arn" {
  value = aws_sqs_queue.notifications.arn
}

output "notification_lambda_name" {
  value = aws_lambda_function.notification.function_name
}

output "notification_log_group" {
  value = aws_cloudwatch_log_group.notification.name
}