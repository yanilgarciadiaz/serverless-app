package com.proyect1.hex_p1.infrastructure.adapters.jpa;
import com.proyect1.hex_p1.domain.model.User;

public class UserEntityMapper {

    public User toDomain(UserEntity entity) {
        if (entity == null) return null;
        return new User(
                entity.getId(),
                entity.getUsername(),
                entity.getEmail(),
                entity.getPassword()
        );
    }

    public UserEntity toEntity(User domain) {
        if (domain == null) return null;
        return new UserEntity(
                domain.getId(),
                domain.getUsername(),
                domain.getEmail(),
                domain.getPassword()
        );
    }
}
