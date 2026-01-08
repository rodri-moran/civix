package com.example.report_service.dtos;

import com.example.report_service.enums.Status;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class HistoryEntryDto {
    private Status oldStatus;
    private Status newStatus;
    private OffsetDateTime changedAt;
    private Long reportId;
    private Long changedBy; //userId

}
