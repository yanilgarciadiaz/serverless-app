package com.proyect1.hex_p1.application.usecase;

import com.proyect1.hex_p1.domain.model.User;
import com.proyect1.hex_p1.domain.repository.UserRepositoryPort;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.List;

public class UserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final PasswordEncoder passwordEncoder;

    // Constructor para inyectar el repositorio y el encriptador de contraseñas
    public UserUseCase(UserRepositoryPort userRepositoryPort, PasswordEncoder passwordEncoder) {
        this.userRepositoryPort = userRepositoryPort;
        this.passwordEncoder = passwordEncoder;
    }

    // Caso de uso para crear / registrar un usuario
    public User createUser(User user) {
        // Encriptamos la contraseña antes de enviarla a guardar por seguridad
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepositoryPort.save(user);
    }

    // Caso de uso para buscar un usuario por su nombre de usuario
    public Optional<User> getByUsername(String username) {
        return userRepositoryPort.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepositoryPort.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepositoryPort.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepositoryPort.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            // Si actualiza la contraseña, la volvemos a encriptar
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            return userRepositoryPort.save(user);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    public void deleteUser(Long id) {
        userRepositoryPort.deleteById(id);
    }
}