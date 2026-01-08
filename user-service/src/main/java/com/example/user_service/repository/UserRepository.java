package com.example.user_service.repository;

import com.example.user_service.entity.UserEntity;
import com.example.user_service.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
    List<UserEntity> getAllByRole(Role role);
}
