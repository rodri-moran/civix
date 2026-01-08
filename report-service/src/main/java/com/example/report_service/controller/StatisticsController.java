package com.example.report_service.controller;
import com.example.report_service.enums.Status;
import com.example.report_service.services.interfaces.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/report/public/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/reports")
    public ResponseEntity<Long> getTotalReports() {
        return ResponseEntity.ok(statisticsService.getTotalReports());
    }

    @GetMapping("/reports/by-status")
    public ResponseEntity<Map<Status, Long>> getReportsCountByStatus() {
        return ResponseEntity.ok(statisticsService.getReportsCountByStatus());
    }

    @GetMapping("/reports/by-squad")
    public ResponseEntity<Map<String, Long>> getReportsCountBySquad() {
        return ResponseEntity.ok(statisticsService.getReportsCountBySquad());
    }

    @GetMapping("/time/resolution")
    public ResponseEntity<Duration> getAverageResolutionTime() {
        return ResponseEntity.ok(statisticsService.getAverageResolutionTime());
    }

    @GetMapping("/time/resolution/by-squad")
    public ResponseEntity<Map<String, Duration>> getAverageResolutionTimeBySquad() {
        return ResponseEntity.ok(statisticsService.getAverageResolutionTimeBySquad());
    }
}