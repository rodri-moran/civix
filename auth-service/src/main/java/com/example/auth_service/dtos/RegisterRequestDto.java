package com.example.auth_service.dtos;

import com.example.auth_service.enums.Role;

import java.time.LocalDate;

public record RegisterRequestDto(
        String email,
        String passwordHash,
        String name,
        String lastName,
        Role role
) {
}
