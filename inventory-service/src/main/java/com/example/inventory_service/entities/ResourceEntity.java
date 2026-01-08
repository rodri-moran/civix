package com.example.inventory_service.entities;
import com.example.inventory_service.enums.Area;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name = "resource_entity")
@Data
public class ResourceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Nullable
    private String description;
    private Integer stock;
    private String unit; //unidad de medida, por ejemplo unidades, gramos, litros, etc.
    @Enumerated(EnumType.STRING)
    private Area area;
    private boolean active = true;
}