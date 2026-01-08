package com.example.report_service.services.impl;

import com.example.report_service.configs.JwtUtil;
import com.example.report_service.dtos.*;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.entity.ReportStatusHistoryEntity;
import com.example.report_service.entity.SquadEntity;
import com.example.report_service.enums.Status;
//import com.example.report_service.repository.HistoryRepository;
import com.example.report_service.repository.ReportRepository;
import com.example.report_service.repository.SquadRepository;
import com.example.report_service.services.interfaces.ReportService;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import org.springframework.security.access.AccessDeniedException;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository repository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SquadRepository squadRepository;
    @Autowired
    private WebClient.Builder webClientBuilder;
//    @Autowired
//    private HistoryRepository historyRepository;
    @Autowired
    private JwtUtil jwtUtil;


    private static final Logger log =
            LoggerFactory.getLogger(ReportServiceImpl.class);
    @Override
    public ReportResponseDto createReport(ReportRequestDto request) {
        request.setStatus(Status.PENDING);
        ReportEntity reportEntity = modelMapper.map(request, ReportEntity.class);

        ReportEntity saved = repository.save(reportEntity);

        return modelMapper.map(saved, ReportResponseDto.class);
    }

    @Override
    public List<ReportResponseDto> getReportsByUserId(Long userId) {
        List<ReportEntity> reportEntityList = repository.getReportEntitiesByUserId(userId);
        List<ReportResponseDto> responseList = new ArrayList<>();
        for (ReportEntity r : reportEntityList){
            ReportResponseDto dto = convertEntityToDto(r);
            responseList.add(dto);
        }
        return responseList;
    }

    @Override
    public List<ReportResponseDto> getAll() {
        List<ReportEntity> reportEntityList = repository.findAll()
                .stream()
                .sorted(Comparator.comparing(ReportEntity::getStatus))
                .toList();

        return reportEntityList.stream()
                .map(this::convertEntityToDto)
                .toList();
    }

    @Override
    public ReportResponseDto assignSquadToReport(Long reportId, Long squadId) {
        System.out.println("llegó al service con el reportId: " + reportId + " y el squadId: " + squadId);
        ReportEntity reportEntity = repository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Report con el id " + reportId + "no encontrado"));
        SquadEntity squadEntity = squadRepository.findById(squadId)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id " + squadId + " no encontrado"));
        System.out.println("pasó los primeros dos filtros");
        reportEntity.setSquad(squadEntity);
        reportEntity.setStatus(Status.IN_PROCESS);
        squadEntity.getReports().add(reportEntity);

        reportEntity = repository.save(reportEntity);
        squadEntity = squadRepository.save(squadEntity);

        SquadResponseDTO squadResponse = modelMapper.map(squadEntity, SquadResponseDTO.class);
        ReportResponseDto response = modelMapper.map(reportEntity, ReportResponseDto.class);

        response.setSquad(squadResponse);
        return response;
    }

    @Override
    public ReportResponseDto getById(Long id) {
        ReportEntity entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Report con el id " + id + " no encontrado."));
        return modelMapper.map(entity, ReportResponseDto.class);
    }

    @Override
    public List<ReportResponseDto> getReportsByStatus(String status) {
        Status enumStatus = Status.valueOf(status.toUpperCase());
        return repository.findByStatus(enumStatus)
                .stream()
                .map(x -> modelMapper.map(x, ReportResponseDto.class))
                .toList();
    }

    @Override
    public ReportResponseDto updateReportStatus(Long reportId, Status status, ResourcesUsedDto resourcesUsed) {
        ReportEntity entity = repository.findById(reportId)
                .orElseThrow( () -> new EntityNotFoundException("Report con el id " + reportId + " no encontrado"));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.info("Auth principal: {}", auth.getPrincipal());
        log.info("Auth authorities: {}", auth.getAuthorities());
        log.info("Auth details: {}", auth.getDetails());

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        boolean isCuadrilla = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_CUADRILLA"));

        if(isCuadrilla && !isAdmin) {
            Long supervisorUserId = entity.getSquad().getSupervisorUserId();
            Long userId = (Long) auth.getDetails();

            if (!supervisorUserId.equals(userId)) {
                throw new AccessDeniedException(
                        "No tenés permiso para modificar este reporte"
                );
            }
        }

        if(status.equals(Status.RESOLVED)){
            if (resourcesUsed != null && resourcesUsed.getItems() != null
                    && !resourcesUsed.getItems().isEmpty()) {
                sendResourcesUsedToInventoryService(resourcesUsed);
            }
            entity.setResolvedAt(OffsetDateTime.now());
        } else {
            entity.setResolvedAt(null);
        }

//        ReportStatusHistoryEntity history = new ReportStatusHistoryEntity();
//        history.setReport(entity);
//        history.setOldStatus(entity.getStatus());
//        history.setNewStatus(status);
//
//        historyRepository.save(history);

        entity.setStatus(status);
        repository.save(entity);
        return modelMapper.map(entity, ReportResponseDto.class);
    }

    public void sendResourcesUsedToInventoryService(ResourcesUsedDto resourcesUsed) {

        InventoryMovementDto inventoryDto = new InventoryMovementDto();

        inventoryDto.setTypeMovement(resourcesUsed.getTypeMovement());
        inventoryDto.setUserId((Long) SecurityContextHolder.getContext().getAuthentication().getDetails());
        inventoryDto.setReportId(resourcesUsed.getReportId());
        inventoryDto.setReason(resourcesUsed.getReason());

        if (resourcesUsed.getItems() != null && !resourcesUsed.getItems().isEmpty()) {

            List<ItemMovementDetailDto> details = resourcesUsed.getItems()
                    .stream()
                    .map(item -> {
                        ItemMovementDetailDto d = new ItemMovementDetailDto();
                        d.setResourceId(item.getResourceId());
                        d.setQuantity(item.getQuantity());
                        return d;
                    })
                    .toList();

            inventoryDto.setMovementDetail(details);
        } else {
            inventoryDto.setMovementDetail(List.of());
        }

        String userToken = getBearerTokenFromCurrentRequest();
        if (userToken == null) {
            throw new AccessDeniedException("Falta token para llamar a inventory-service");
        }
        log.info("Token reenviado a inventory-service: {}", userToken != null);

        webClientBuilder.build()
                .post()
                .uri("http://inventory-service:8084/api/inventory/squad/movements")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken)
                .bodyValue(inventoryDto)
                .retrieve()
                .toBodilessEntity()
                .block();
    }


//    UserResponseDto user = webClientBuilder.build()
//            .get()
//            .uri("http://user-service:8081/api/users/public/by-email/{email}", dto.getEmail())
//            .retrieve()
//            .bodyToMono(UserResponseDto.class)
//            .block();

    private ReportResponseDto convertEntityToDto (ReportEntity entity){
        return modelMapper.map(entity, ReportResponseDto.class);
    }

    @Override
    public List<ReportResponseDto> getReportsBySupervisorId(Long id) {
        return repository.findBySquad_SupervisorUserId(id)
                .stream().map(x  -> modelMapper.map(x, ReportResponseDto.class))
                .toList();
    }

    private String getBearerTokenFromCurrentRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs == null) return null;
        String auth = attrs.getRequest().getHeader(HttpHeaders.AUTHORIZATION);
        if(auth!=null) {
            log.info("Auth string: {}", auth.substring(7));
        }

        if (auth != null && auth.startsWith("Bearer "))

            return auth.substring(7);
        return null;
    }

}
