package com.example.report_service.services.impl;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.enums.Status;
import com.example.report_service.repository.ReportRepository;
import com.example.report_service.services.interfaces.ReportService;
import com.example.report_service.services.interfaces.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.*;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private ReportService reportService;
    @Autowired
    private ReportRepository reportRepository;
    @Override
    public Long getTotalReports() {
        return (long) reportService.getAll()
                .size();
    }

    @Override
    public Map<Status, Long> getReportsCountByStatus() {

        Map<Status, Long> map = new EnumMap<>(Status.class);

        for (Status s : Status.values()) {
            map.put(s, 0L);
        }

        List<Object[]> results = reportRepository.countByStatusGrouped();

        for (Object[] row : results){
            Status status = (Status) row[0];
            Long count = (Long) row[1];
            map.put(status, count);
        }

        return map;
    }
    @Override
    public Map<String, Long> getReportsCountBySquad() {

        Map<String, Long> map = new HashMap<>();

        List<Object[]> results = reportRepository.countBySquad();

        for(Object[] row: results){
            String squadName = (String) row[0];
            Long count = (Long) row[1];
            map.put(squadName, count);
        }
        return map;
    }

    @Override
    public Duration getAverageResolutionTime() {
        List<ReportEntity> listReports = reportRepository.findAllByStatusOrResolvedAtIsNotNull(Status.RESOLVED);
        if (listReports.isEmpty()) {
            return Duration.ZERO;
        }
        List<Duration> durationList = listReports.stream()
                .map(x -> Duration.between(x.getCreatedAt(), x.getResolvedAt()))
                .toList();

        double totalHours = durationList.stream()
                .mapToDouble(Duration::toHours)
                .sum();

        double avgHours = totalHours / durationList.size();

        return Duration.ofHours((long) avgHours);
    }

    //@Query("SELECT r.squad.name, r.createdAt, r.resolvedAt FROM ReportEntity r WHERE r.resolvedAt IS NOT NULL")
    //    List<Object[]> getResolutionData();
    @Override
    public Map<String, Duration> getAverageResolutionTimeBySquad() {
        List<Object[]> results = reportRepository.getResolutionData();

        Map<String, List<Duration>> durationsBySquad = new HashMap<>();

        Map<String, Duration> map = new HashMap<>();

        for(Object[] row: results){

            String squadName = (String) row[0];
            OffsetDateTime createdAt = (OffsetDateTime) row[1];
            OffsetDateTime resolvedAt = (OffsetDateTime) row[2];

            Duration duration = Duration.between(createdAt, resolvedAt);

            // Para cada resultado, agregamos la duración correspondiente a la cuadrilla:
            // computeIfAbsent() verifica si la clave squadName existe en el mapa:
            //   - Si NO existe → crea una nueva lista con new ArrayList<>()
            //   - Si SÍ existe → devuelve la lista existente
            // Luego .add(duration) agrega la duración a esa lista.
            // En resumen: agrupa todas las duraciones por nombre de cuadrilla.
            durationsBySquad
                    .computeIfAbsent(squadName, k -> new ArrayList<>())
                    .add(duration);
        }

        Map<String, Duration> avgMap = new HashMap<>();

        // Recorremos cada entrada del mapa que tiene:
        // clave = nombre de la cuadrilla
        // valor = lista de duraciones de todos los reportes de esa cuadrilla
        for (Map.Entry<String, List<Duration>> entry : durationsBySquad.entrySet()) {

            // Nombre de la cuadrilla
            String squadName = entry.getKey();

            // Lista de duraciones de resolución para esa cuadrilla
            List<Duration> dList = entry.getValue();

            // Sumamos todas las duraciones en horas usando streams
            long totalHours = dList.stream()
                    .mapToLong(Duration::toHours)
                    .sum();

            // Calculamos el promedio: total de horas dividido la cantidad de duraciones
            long avgHours = totalHours / dList.size();

            // Guardamos en el mapa final el promedio convertido nuevamente en Duration
            avgMap.put(squadName, Duration.ofHours(avgHours));
        }

        return avgMap;
    }
}