package com.proyect1.hex_p1.infrastructure.rest;

import com.proyect1.hex_p1.application.usecase.UserUseCase;
import com.proyect1.hex_p1.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserUseCase userUseCase;

    public UserController(UserUseCase userUseCase) {
        this.userUseCase = userUseCase;
    }

    // Crear un nuevo usuario estando autenticado (Requiere Token JWT)
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userUseCase.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    // Listar todos los usuarios (Requiere Token JWT)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userUseCase.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Buscar usuario por ID (Requiere Token JWT)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userUseCase.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar usuario (Requiere Token JWT)
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userUseCase.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar usuario (Requiere Token JWT)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userUseCase.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}