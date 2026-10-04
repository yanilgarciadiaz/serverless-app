package com.proyect1.hex_p1.infrastructure.adapters.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    // Carpeta local donde se guardarán los archivos en tu proyecto
    private final Path rootLocation = Paths.get("uploads");

    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("No se puede subir un archivo vacío.");
            }

            // Crear la carpeta uploads si no existe
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            // Generar un nombre único para que no se sobrescriban archivos con el mismo nombre
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            
            // Guardar físicamente el archivo
            Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));

            // Retornar el nombre o la ruta simulada que guardaremos en la base de datos
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Fallo al almacenar el archivo: " + e.getMessage(), e);
        }
    }
}