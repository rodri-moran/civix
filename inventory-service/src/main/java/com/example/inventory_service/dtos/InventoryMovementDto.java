package com.example.inventory_service.dtos;

import com.example.inventory_service.entities.ResourceEntity;
import com.example.inventory_service.enums.TypeMovement;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.hibernate.validator.constraints.Length;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO used to register manual inventory movements (entries or exits).
 */
public class InventoryMovementDto {
    List<ItemMovementDetailDto> movementDetail = new ArrayList<>();
    private TypeMovement typeMovement;
    private Long userId;
    private Long reportId;
    private String reason;

    public List<ItemMovementDetailDto> getMovementDetail() {
        return movementDetail;
    }

    public void setMovementDetail(List<ItemMovementDetailDto> movementDetail) {
        this.movementDetail = movementDetail;
    }

    public TypeMovement getTypeMovement() {
        return typeMovement;
    }

    public void setTypeMovement(TypeMovement typeMovement) {
        this.typeMovement = typeMovement;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
