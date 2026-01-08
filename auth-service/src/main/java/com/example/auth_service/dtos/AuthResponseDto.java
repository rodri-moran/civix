package com.example.auth_service.dtos;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private String role;
    private Long userId;
    private String name;
    private String lastName;


    public AuthResponseDto(String token, String role, Long userId, String name, String lastName){
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
    }
}
