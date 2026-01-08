package com.example.inventory_service.dtos;
import com.example.inventory_service.entities.ResourceEntity;
import com.example.inventory_service.enums.TypeMovement;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public class InventoryMovementResponseDto {
    private ResourceEntity resource;
    private TypeMovement typeMovement;
    private Integer quantity;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private OffsetDateTime date = OffsetDateTime.now();
    private String userName; // quien registró el movimiento (admin, responsable, etc.)
    private String reportTitle;
    private String reason;
    public ResourceEntity getResource() {
        return resource;
    }
    public void setResource(ResourceEntity resource) {
        this.resource = resource;
    }
    public TypeMovement getTypeMovement() {
        return typeMovement;
    }
    public void setTypeMovement(TypeMovement typeMovement) {
        this.typeMovement = typeMovement;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public OffsetDateTime getDate() {
        return date;
    }
    public void setDate(OffsetDateTime date) {
        this.date = date;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle;
    }

    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }
}