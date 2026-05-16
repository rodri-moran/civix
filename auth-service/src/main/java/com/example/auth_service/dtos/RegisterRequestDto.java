package com.example.auth_service.dtos;

import com.example.auth_service.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record RegisterRequestDto(

        @Email(message = "El email no es válido")
        @NotBlank(message = "El email es obligatorio")
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 8, max = 72, message = "La contraseña debe tener entre 8 y 72 caracteres")
        String passwordHash,

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
        String name,

        @Size(max = 50, message = "El apellido no puede superar los 50 caracteres")
        String lastName,

        Role role
) {}