package com.example.report_service.services.interfaces;

import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.SquadRequestDTO;
import com.example.report_service.dtos.SquadResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SquadService {
    SquadResponseDTO createSquad(SquadRequestDTO dto);
    List<SquadResponseDTO> getAll();
    SquadResponseDTO deleteById(Long id);
    SquadResponseDTO getById(Long id);
    SquadResponseDTO updateSquad(SquadRequestDTO requestDto, Long idSquadToUpdate);
    List<SquadResponseDTO> getSquadsBySupervisorId(Long supervisorId);
}
