package com.example.report_service.entity;
import com.example.report_service.enums.Status;
import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;
@Entity
@Data
public class ReportStatusHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private ReportEntity report;
    @Enumerated(EnumType.STRING)
    private Status oldStatus;
    @Enumerated(EnumType.STRING)
    private Status newStatus;
    private OffsetDateTime changedAt;
}