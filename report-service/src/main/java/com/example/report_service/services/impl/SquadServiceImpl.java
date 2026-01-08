package com.example.report_service.services.impl;

import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.SquadRequestDTO;
import com.example.report_service.dtos.SquadResponseDTO;
import com.example.report_service.dtos.UserBasicDto;
import com.example.report_service.entity.SquadEntity;
import com.example.report_service.repository.SquadRepository;
import com.example.report_service.services.interfaces.SquadService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Primary
public class SquadServiceImpl implements SquadService {
    @Autowired
    private SquadRepository repo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private  WebClient.Builder userClient;

    @Override
    public SquadResponseDTO createSquad(SquadRequestDTO dto) {

        String token = getBearerTokenFromCurrentRequest();

        SquadEntity squad = new SquadEntity();
        squad.setName(dto.getName());
        squad.setDescription(dto.getDescription());
        squad.setArea(dto.getArea());
        squad.setTeamSize(dto.getTeamSize());
        squad.setSupervisorUserId(dto.getSupervisorUserId());

        UserBasicDto supervisor = userClient.build()
                .get()
                .uri("http://user-service:8081/api/users/internal/{id}/basic", dto.getSupervisorUserId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .retrieve()
                .bodyToMono(UserBasicDto.class)
                .block();

        if (supervisor == null || !"CUADRILLA".equals(supervisor.getRole())) {
            throw new IllegalArgumentException("El supervisor debe tener rol CUADRILLA");
        }

        squad.setSupervisorUserId(supervisor.getId());
        SquadEntity saved = repo.save(squad);
        return modelMapper.map(saved, SquadResponseDTO.class);
    }

    @Override
    public List<SquadResponseDTO> getAll() {
        return repo.findAll().stream()
                .map(x -> modelMapper.map(x, SquadResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SquadResponseDTO deleteById(Long id) {
        SquadEntity squadEntity = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id: " + id + " no encontrado"));
        repo.deleteById(id);
        return modelMapper.map(squadEntity, SquadResponseDTO.class);
    }

    @Override
    public SquadResponseDTO getById(Long id) {
        SquadEntity squadEntity = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id: " + id + " no encontrado"));
        return modelMapper.map(squadEntity, SquadResponseDTO.class);
    }

    @Override
    @Transactional
    public SquadResponseDTO updateSquad(SquadRequestDTO dto, Long idSquadToUpdate) {
        SquadEntity squad = repo.findById(idSquadToUpdate)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id: " + idSquadToUpdate + " no encontrado"));

        if (dto.getName() != null) squad.setName(dto.getName());
        if (dto.getDescription() != null) squad.setDescription(dto.getDescription());
        if (dto.getArea() != null) squad.setArea(dto.getArea());
        if (dto.getTeamSize() != null) squad.setTeamSize(dto.getTeamSize());
        if (dto.getSupervisorUserId() != null)
            squad.setSupervisorUserId(dto.getSupervisorUserId());

        repo.save(squad);

        return modelMapper.map(squad, SquadResponseDTO.class);
    }

    @Override
    public List<SquadResponseDTO> getSquadsBySupervisorId(Long supervisorId) {
        return repo.findBySupervisorUserId(supervisorId)
                .stream()
                .map(x -> modelMapper.map(x, SquadResponseDTO.class))
                .toList();
    }

    private String getBearerTokenFromCurrentRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs == null) return null;
        String auth = attrs.getRequest().getHeader(HttpHeaders.AUTHORIZATION);

        if (auth != null && auth.startsWith("Bearer "))

            return auth.substring(7);
        return null;
    }
}