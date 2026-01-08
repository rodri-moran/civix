package com.example.user_service.entity;
import com.example.user_service.enums.Role;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import java.time.LocalDate;
@Entity
@Table(name = "user_entity")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String lastName;

    @Email
    private String email;

    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate registrationDate;
    @Nullable
    private String phone;

    @Nullable
    private String address;
}