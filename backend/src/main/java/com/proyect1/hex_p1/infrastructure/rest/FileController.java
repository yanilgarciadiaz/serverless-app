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
        // 1. Guardar el archivo
        String fileName = fileStorageService.store(file);

        // 2. URL de acceso de forma dinámica
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/files/download/")
                .path(fileName)
                .toUriString();

        // 3.respuesta JSON con los datos del archivo guardado
        Map<String, String> response = new HashMap<>();
        response.put("fileName", fileName);
        response.put("url", fileDownloadUri);

        return ResponseEntity.ok(response);
    }
}