package com.example.report_service.services.interfaces;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.ResourcesUsedDto;
import com.example.report_service.enums.Status;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReportService {
    ReportResponseDto createReport(ReportRequestDto request);
    List<ReportResponseDto> getReportsByUserId(Long userId);
    List<ReportResponseDto> getAll();
    ReportResponseDto assignSquadToReport(Long reportId, Long squadId);
    ReportResponseDto getById(Long id);
    List<ReportResponseDto> getReportsByStatus(String status);
    ReportResponseDto updateReportStatus(Long reportId, Status status, ResourcesUsedDto resourcesUsed);
    List<ReportResponseDto> getReportsBySupervisorId(Long id);
}
