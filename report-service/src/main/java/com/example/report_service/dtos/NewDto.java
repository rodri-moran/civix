package com.example.report_service.dtos;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class NewDto {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String category;
}