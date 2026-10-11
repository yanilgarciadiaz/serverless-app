package com.proyect1.hex_p1.infrastructure.adapters.messaging;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
public class SnsNotificationPublisher {

    private final String topicArn;
    private final SnsClient snsClient;

    public SnsNotificationPublisher(@Value("${app.notifications.topic-arn:}") String topicArn,
                                    @Value("${app.storage.region:us-east-2}") String region) {
        this.topicArn = topicArn;
        if (isConfigured()) {
            this.snsClient = SnsClient.builder()
                    .region(Region.of(region))
                    .httpClient(UrlConnectionHttpClient.create())
                    .build();
        } else {
            this.snsClient = null;
        }
    }

    public boolean isConfigured() {
        return topicArn != null && !topicArn.isBlank();
    }

    // Publica el mensaje en SNS y devuelve el MessageId
    public String publish(String email, String subject, String message) {
        String body = "{\"email\":\"" + escape(email) + "\","
                + "\"subject\":\"" + escape(subject) + "\","
                + "\"message\":\"" + escape(message) + "\"}";

        PublishResponse response = snsClient.publish(PublishRequest.builder()
                .topicArn(topicArn)
                .message(body)
                .build());
        return response.messageId();
    }

    private static String escape(String value) {
        StringBuilder sb = new StringBuilder();
        for (char c : value.toCharArray()) {
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < 0x20) {
                        sb.append(String.format("\\u%04x", (int) c));
                    } else {
                        sb.append(c);
                    }
                }
            }
        }
        return sb.toString();
    }
}