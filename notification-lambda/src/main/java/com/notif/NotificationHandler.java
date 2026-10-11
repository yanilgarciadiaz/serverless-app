package com.notif;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.SQSEvent;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.Body;
import software.amazon.awssdk.services.sesv2.model.Content;
import software.amazon.awssdk.services.sesv2.model.Destination;
import software.amazon.awssdk.services.sesv2.model.EmailContent;
import software.amazon.awssdk.services.sesv2.model.Message;
import software.amazon.awssdk.services.sesv2.model.SendEmailRequest;

public class NotificationHandler implements RequestHandler<SQSEvent, Void> {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final String SENDER = System.getenv("SENDER_EMAIL");
    private static final SesV2Client SES = SesV2Client.builder()
            .region(Region.of(System.getenv("AWS_REGION")))
            .httpClient(UrlConnectionHttpClient.create())
            .build();

    @Override
    public Void handleRequest(SQSEvent event, Context context) {
        for (SQSEvent.SQSMessage record : event.getRecords()) {
            context.getLogger().log("Mensaje recibido de SQS. Id: " + record.getMessageId() + "\n");
            try {
                JsonNode body = MAPPER.readTree(record.getBody());
                String to = body.path("email").asText();
                String subject = body.path("subject").asText();
                String text = body.path("message").asText();

                if (to.isBlank() || subject.isBlank() || text.isBlank()) {
                    throw new IllegalArgumentException("Mensaje incompleto: " + record.getBody());
                }

                SES.sendEmail(SendEmailRequest.builder()
                        .fromEmailAddress(SENDER)
                        .destination(Destination.builder().toAddresses(to).build())
                        .content(EmailContent.builder()
                                .simple(Message.builder()
                                        .subject(Content.builder().data(subject).charset("UTF-8").build())
                                        .body(Body.builder()
                                                .text(Content.builder().data(text).charset("UTF-8").build())
                                                .build())
                                        .build())
                                .build())
                        .build());

                context.getLogger().log("Correo enviado correctamente a: " + to + "\n");
            } catch (Exception e) {
                context.getLogger().log("ERROR enviando correo: " + e.getMessage() + "\n");
                // Al relanzar, SQS reintenta el mensaje y después de 3 intentos lo manda a la DLQ
                throw new RuntimeException(e);
            }
        }
        return null;
    }
}