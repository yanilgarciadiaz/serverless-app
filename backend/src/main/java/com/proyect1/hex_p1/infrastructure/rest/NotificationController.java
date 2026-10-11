package com.proyect1.hex_p1.infrastructure.rest;

import com.proyect1.hex_p1.infrastructure.adapters.messaging.SnsNotificationPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Pattern EMAIL =
            Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    private final SnsNotificationPublisher publisher;

    public NotificationController(SnsNotificationPublisher publisher) {
        this.publisher = publisher;
    }

    public record NotificationRequest(String email, String subject, String message) {}

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> send(@RequestBody NotificationRequest request) {
        // 1. Validar la solicitud
        String error = validate(request);
        if (error != null) {
            return ResponseEntity.badRequest().body(Map.of("message", error));
        }
        if (!publisher.isConfigured()) {
            return ResponseEntity.status(503).body(Map.of("message", "Notificaciones no configuradas."));
        }

        // 2. Publicar en SNS
        try {
            String messageId = publisher.publish(
                    request.email().trim(), request.subject().trim(), request.message().trim());

            // 3. Respuesta exitosa
            return ResponseEntity.ok(Map.of(
                    "message", "Mensaje enviado correctamente.",
                    "messageId", messageId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al enviar mensaje."));
        }
    }

    private String validate(NotificationRequest r) {
        if (r == null || r.email() == null || r.email().isBlank()) {
            return "El correo es obligatorio.";
        }
        if (!EMAIL.matcher(r.email().trim()).matches()) {
            return "El correo no es válido.";
        }
        if (r.subject() == null || r.subject().isBlank()) {
            return "El asunto es obligatorio.";
        }
        if (r.subject().length() > 150) {
            return "El asunto es demasiado largo (máximo 150).";
        }
        if (r.message() == null || r.message().isBlank()) {
            return "El mensaje es obligatorio.";
        }
        if (r.message().length() > 2000) {
            return "El mensaje es demasiado largo (máximo 2000).";
        }
        return null;
    }
}