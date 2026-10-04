package com.proyect1.hex_p1.infrastructure.config;

import com.proyect1.hex_p1.application.usecase.UserUseCase;
import com.proyect1.hex_p1.domain.repository.UserRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfiguration {

    @Bean
    public UserUseCase userUseCase(UserRepositoryPort userRepositoryPort, PasswordEncoder passwordEncoder) {
        return new UserUseCase(userRepositoryPort, passwordEncoder);
    }
}