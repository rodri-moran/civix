package com.example.inventory_service.services;

import com.example.inventory_service.dtos.InventoryMovementDto;
import com.example.inventory_service.dtos.InventoryMovementResponseDto;
import com.example.inventory_service.dtos.ResourceCreateDto;
import com.example.inventory_service.dtos.ResourceDto;
import com.example.inventory_service.enums.Area;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InventoryService {
    List<ResourceDto> getAllResources();
    ResourceCreateDto createResource(ResourceCreateDto dto);
    ResourceCreateDto updateResource(Long id, ResourceCreateDto dto);
    ResourceCreateDto deleteResource(Long id);
    InventoryMovementDto registerMovement(InventoryMovementDto dto);
    List<ResourceCreateDto> getResourcesByArea(Area area);
    List<InventoryMovementResponseDto> getAllMovements();
}
