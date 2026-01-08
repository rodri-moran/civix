package com.example.report_service.services.interfaces;
import com.example.report_service.enums.Status;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.Map;
@Service
public interface StatisticsService {
    Long getTotalReports();
    Map<Status, Long> getReportsCountByStatus();
    Map<String, Long> getReportsCountBySquad();
    //métricas basadas en el histórico
    Duration getAverageResolutionTime();
//    Map<String, Duration> getAverageResolutionTimeByType();
    Map<String, Duration> getAverageResolutionTimeBySquad();

}