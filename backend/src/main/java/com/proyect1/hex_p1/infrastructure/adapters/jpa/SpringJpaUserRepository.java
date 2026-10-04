package com.proyect1.hex_p1.infrastructure.adapters.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SpringJpaUserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
}