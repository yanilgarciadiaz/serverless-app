package com.proyect1.hex_p1.infrastructure.rest;

import com.proyect1.hex_p1.application.usecase.UserUseCase;
import com.proyect1.hex_p1.domain.model.User;
import com.proyect1.hex_p1.infrastructure.security.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserUseCase userUseCase;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserUseCase userUseCase, AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userUseCase = userUseCase;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    // Endpoint de Registro
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User createdUser = userUseCase.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    // Endpoint de Login (Devuelve el Token JWT)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(jwt);
    }
}