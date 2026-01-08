package com.example.inventory_service.dtos;
import com.example.inventory_service.enums.Area;
import jakarta.annotation.Nullable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
@Data
public class ResourceDto {
    private Long id;
    private String name;
    @Nullable
    private String description;
    private Integer stock;
    private String unit; //unidad de medida, por ejemplo unidades, gramos, litros, etc.
    @Enumerated(EnumType.STRING)
    private Area area;
    private boolean active;
}