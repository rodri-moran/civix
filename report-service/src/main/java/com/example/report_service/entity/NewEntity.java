package com.example.report_service.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.OffsetDateTime;

@Entity
@Data
public class NewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private OffsetDateTime date;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String category;
}