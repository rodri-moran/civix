package com.example.user_service.controller;

import com.example.user_service.dtos.*;
import com.example.user_service.entity.UserEntity;
import com.example.user_service.enums.Role;
import com.example.user_service.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserRequestDto dto){
        return ResponseEntity.ok(userService.createUser(dto));
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<UserResponseDto> getUserById( @PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/public")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/public/{userId}")
    public ResponseEntity<UserResponseDto> updateUser(@Valid @RequestBody UserUpdateDto dto, @PathVariable Long userId){
        return ResponseEntity.ok(userService.updateUser(dto, userId));
    }

    @DeleteMapping("/public/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @GetMapping("/internal/auth/{email}")
    public ResponseEntity<UserAuthDto> getUserForAuth(@PathVariable String email){
        return ResponseEntity.ok(userService.findByEmailWithPassword(email));
    }
    @GetMapping("/me")
    public ResponseEntity<UserDto> getProfile() {
        return ResponseEntity.ok(userService.getProfile());
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserUpdateDto dto) {
        return ResponseEntity.ok(userService.updateProfile(dto));
    }

    @GetMapping("/internal/{id}/basic")
    public ResponseEntity<UserBasicDto> getById(@PathVariable Long id){
        UserResponseDto userEntity = userService.getUserById(id);

        return ResponseEntity.ok(new UserBasicDto(userEntity.getId(), userEntity.getRole().name()));
    }

    @GetMapping("/internal/supervisors")
    public ResponseEntity<List<UserResponseDto>> getSupervisors() {
        return ResponseEntity.ok(userService.getUsersByRole(Role.CUADRILLA));
    }
}