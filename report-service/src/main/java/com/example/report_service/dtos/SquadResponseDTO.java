package com.example.report_service.dtos;
import com.example.report_service.enums.Area;
import lombok.Data;
@Data
public class SquadResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Area area;
    private Integer teamSize;
    private Long supervisorUserId;
}