package com.example.user_service.dtos;
import com.example.user_service.enums.Role;
import lombok.Data;

@Data
public class UserAuthDto {
    private Long id;
    private String email;
    private Role role;
    private String passwordHash;
    private String name;
    private String lastName;
}
