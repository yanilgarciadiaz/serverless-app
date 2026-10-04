package com.proyect1.hex_p1.infrastructure.rest;

import com.proyect1.hex_p1.infrastructure.adapters.storage.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        // 1. Guardar el archivo (S3 en la nube, carpeta local en tu PC)
        String fileName = fileStorageService.store(file);

        // 2. URL de acceso: en S3 es una URL temporal firmada
        String fileUrl = fileStorageService.getFileUrl(fileName);
        if (fileUrl == null) {
            fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/files/download/")
                    .path(fileName)
                    .toUriString();
        }

        // 3. Respuesta JSON (misma forma que antes, la app móvil no cambia)
        Map<String, String> response = new HashMap<>();
        response.put("fileName", fileName);
        response.put("url", fileUrl);

        return ResponseEntity.ok(response);
    }
}