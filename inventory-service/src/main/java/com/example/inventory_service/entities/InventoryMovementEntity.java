package com.example.inventory_service.entities;
import com.example.inventory_service.enums.TypeMovement;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;
//Guarda el historial de movimientos (entrada/salida/consumo)
@Entity
@Table(name = "inventory_movements")
@Data
public class InventoryMovementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "resource_id")
    private ResourceEntity resource;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeMovement typeMovement;
    @Column(nullable = false)
    private Integer quantity;
    @Column(nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private OffsetDateTime date = OffsetDateTime.now();
    @Column(name = "user_id", nullable = false)
    private Long userId; // quien registró el movimiento (admin, responsable, etc.)
    @Column(name = "report_id")
    private Long reportId;
    private String userName;
    @Column(length = 255)
    private String reason;
}