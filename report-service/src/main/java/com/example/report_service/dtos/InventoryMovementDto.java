package com.example.report_service.dtos;

import com.example.report_service.enums.TypeMovement;
import lombok.Data;

import java.util.List;

@Data
public class InventoryMovementDto {

    private List<ItemMovementDetailDto> movementDetail;
    private TypeMovement typeMovement;
    private Long userId;
    private Long reportId;
    private String reason;
}
