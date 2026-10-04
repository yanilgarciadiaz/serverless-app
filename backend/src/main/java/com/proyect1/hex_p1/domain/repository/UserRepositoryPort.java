package com.proyect1.hex_p1.domain.repository;

import com.proyect1.hex_p1.domain.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepositoryPort {
    User save(User user);
    Optional<User> findByUsername(String username);
    List<User> findAll();
    Optional<User> findById(Long id);
    void deleteById(Long id);
}