package com.proyect1.hex_p1.infrastructure.adapters.jpa;

import com.proyect1.hex_p1.domain.model.User;
import com.proyect1.hex_p1.domain.repository.UserRepositoryPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final SpringJpaUserRepository springJpaUserRepository;
    private final UserEntityMapper mapper = new UserEntityMapper();

    public UserRepositoryAdapter(SpringJpaUserRepository springJpaUserRepository) {
        this.springJpaUserRepository = springJpaUserRepository;
    }

    @Override
    public User save(User domainUser) {
        UserEntity entity = mapper.toEntity(domainUser);
        UserEntity savedEntity = springJpaUserRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return springJpaUserRepository.findByUsername(username).map(mapper::toDomain);
    }

    @Override
    public List<User> findAll() {
        return springJpaUserRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> findById(Long id) {
        return springJpaUserRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        springJpaUserRepository.deleteById(id);
    }
}