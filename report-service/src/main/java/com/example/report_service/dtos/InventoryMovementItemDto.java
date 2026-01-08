package com.example.report_service.dtos;

import lombok.Data;

@Data
public class InventoryMovementItemDto {
    private Long resourceId;
    private Integer quantity;
}
