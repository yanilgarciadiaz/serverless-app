package com.proyect1.hex_p1.infrastructure.adapters.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.UUID;

@Service
public class FileStorageService {

    // Solo se usa en modo local (cuando no hay bucket configurado)
    private final Path rootLocation = Paths.get("uploads");

    private final String bucket;
    private final S3Client s3Client;
    private final S3Presigner presigner;

    public FileStorageService(@Value("${app.storage.bucket:}") String bucket,
                            @Value("${app.storage.region:us-east-2}") String region) {
        this.bucket = bucket;
        if (usesS3()) {
            Region awsRegion = Region.of(region);
            this.s3Client = S3Client.builder()
                    .region(awsRegion)
                    .httpClient(UrlConnectionHttpClient.create())
                    .build();
            this.presigner = S3Presigner.builder()
                    .region(awsRegion)
                    .build();
        } else {
            this.s3Client = null;
            this.presigner = null;
        }
    }

    public boolean usesS3() {
        return bucket != null && !bucket.isBlank();
    }

    public String store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("No se puede subir un archivo vacío.");
        }

        String original = file.getOriginalFilename() == null ? "archivo" : file.getOriginalFilename();
        String safeName = original.replaceAll("[^A-Za-z0-9._-]", "_");
        String filename = UUID.randomUUID() + "_" + safeName;

        try {
            if (usesS3()) {
                String key = "uploads/" + filename;
                s3Client.putObject(
                        PutObjectRequest.builder()
                                .bucket(bucket)
                                .key(key)
                                .contentType(file.getContentType())
                                .build(),
                        RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
                return key;
            }

            // Modo local
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
            Files.copy(file.getInputStream(), rootLocation.resolve(filename));
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Fallo al almacenar el archivo: " + e.getMessage(), e);
        }
    }

    // URL temporal (60 min) para ver el archivo en S3. En modo local devuelve null.
    public String getFileUrl(String key) {
        if (!usesS3()) {
            return null;
        }
        GetObjectPresignRequest request = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(60))
                .getObjectRequest(GetObjectRequest.builder().bucket(bucket).key(key).build())
                .build();
        return presigner.presignGetObject(request).url().toString();
    }
}