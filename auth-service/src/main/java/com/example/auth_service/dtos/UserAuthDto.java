package com.example.auth_service.dtos;
import lombok.Data;
@Data
public class UserAuthDto {
    private Long id;
    private String email;
    private String passwordHash;
    private String role;
    private String name;
    private String lastName;
}