package com.example.report_service.controller;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.SquadResponseDTO;
import com.example.report_service.services.impl.ReportServiceImpl;
import com.example.report_service.services.interfaces.ReportService;
import com.example.report_service.services.interfaces.SquadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/squad/reports")
public class SquadController {
    @Autowired
    private SquadService squadService;
    @Autowired
    private ReportService reportService;
    private static final Logger log =
            LoggerFactory.getLogger(SquadController.class);

    @GetMapping
    public ResponseEntity<List<ReportResponseDto>> getReportsForSupervisor(Authentication authentication) {
        Long supervisorUserId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(reportService.getReportsBySupervisorId(supervisorUserId));
    }

    @GetMapping("/supervisor")
    public ResponseEntity<List<SquadResponseDTO>> getSquadsBySupervisorId(Authentication authentication){
        log.info("Llegó la solicitud a get squads by supervisor id {}", authentication.getPrincipal());

        Long supervisorUserId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(squadService.getSquadsBySupervisorId(supervisorUserId));
    }
}