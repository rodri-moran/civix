package com.example.inventory_service.controllers;

import com.example.inventory_service.dtos.InventoryMovementDto;
import com.example.inventory_service.dtos.InventoryMovementResponseDto;
import com.example.inventory_service.dtos.ResourceCreateDto;
import com.example.inventory_service.dtos.ResourceDto;
import com.example.inventory_service.enums.Area;
import com.example.inventory_service.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/test")
    public ResponseEntity<String> getHealthOfApi() {
        return ResponseEntity.ok("Works!");
    }

    // Recursos - Admin
    @PostMapping("/admin/resources")
    public ResponseEntity<ResourceCreateDto> createResource(@RequestBody ResourceCreateDto dto) {
        return ResponseEntity.ok(inventoryService.createResource(dto));
    }

    @PutMapping("/admin/resources/{id}")
    public ResponseEntity<ResourceCreateDto> updateResource(
            @PathVariable Long id,
            @RequestBody ResourceCreateDto dto
    ) {
        return ResponseEntity.ok(inventoryService.updateResource(id, dto));
    }

    @DeleteMapping("/admin/resources/{id}")
    public ResponseEntity<ResourceCreateDto> deleteResource(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.deleteResource(id));
    }

    // Recursos - Admin o Cuadrilla
    @GetMapping("/squad/resources")
    public ResponseEntity<List<ResourceDto>> getAllResources() {
        return ResponseEntity.ok(inventoryService.getAllResources());
    }

    @GetMapping("/squad/resources/by-area")
    public ResponseEntity<List<ResourceCreateDto>> getResourcesByArea(@RequestParam Area area) {
        return ResponseEntity.ok(inventoryService.getResourcesByArea(area));
    }

    // Movimientos - Admin o Cuadrilla
    @PostMapping("/squad/movements")
    public ResponseEntity<InventoryMovementDto> registerMovement(@RequestBody InventoryMovementDto dto) {
        return ResponseEntity.ok(inventoryService.registerMovement(dto));
    }

    // Movimientos - Admin
    @GetMapping("/admin/movements")
    public ResponseEntity<List<InventoryMovementResponseDto>> getAllMovements() {
        return ResponseEntity.ok(inventoryService.getAllMovements());
    }
}