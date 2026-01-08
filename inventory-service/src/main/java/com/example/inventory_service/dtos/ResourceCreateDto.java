package com.example.inventory_service.dtos;

import com.example.inventory_service.enums.Area;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

public class ResourceCreateDto {
    private String name;
    @Nullable
    private String description;
    private Integer stock;
    private String unit; //unidad de medida, por ejemplo unidades, gramos, litros, etc.
    @Enumerated(EnumType.STRING)
    private Area area;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Nullable
    public String getDescription() {
        return description;
    }

    public void setDescription(@Nullable String description) {
        this.description = description;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}
