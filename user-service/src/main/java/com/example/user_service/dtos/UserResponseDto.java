package com.example.user_service.dtos;
import com.example.user_service.enums.Role;
import lombok.Data;
import java.time.LocalDate;
@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private Role role;
    private LocalDate registrationDate;
}