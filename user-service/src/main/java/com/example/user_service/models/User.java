package com.example.user_service.models;

import com.example.user_service.enums.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class User {

    private Long id;

    private String name;

    private String lastName;

    private String email;

    private String passwordHash;

    private Role role;

    private LocalDate registrationDate;
}
