package com.example.report_service.controller;
import com.example.report_service.dtos.*;
import com.example.report_service.enums.Status;
import com.example.report_service.services.interfaces.NewService;
import com.example.report_service.services.interfaces.ReportService;
import com.example.report_service.services.interfaces.SquadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private SquadService service;
    @Autowired
    private NewService newService;
    @PostMapping("/admin")
    public ResponseEntity<NewResponseDto> createNew(@RequestBody NewDto dto){
        return ResponseEntity.ok(newService.createNew(dto));
    }
    @GetMapping("/public")
    public ResponseEntity<List<NewResponseDto>> getAllNews(){
        return ResponseEntity.ok(newService.getAllNews());
    }

    @PostMapping("/public")
    public ResponseEntity<ReportResponseDto> createReport(@RequestBody ReportRequestDto dto){
        return ResponseEntity.ok(reportService.createReport(dto));
    }
    @GetMapping("/admin/report/{id}")
    public ResponseEntity<ReportResponseDto> getById(@PathVariable Long id){
        return ResponseEntity.ok(reportService.getById(id));
    }

    @GetMapping("/get-by-user-id")
    public ResponseEntity<List<ReportResponseDto>> getReportsByUserId(Authentication authentication){
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(reportService.getReportsByUserId(userId));
    }
    @GetMapping("/admin/getAll")
    public ResponseEntity<List<ReportResponseDto>> getAll(){
        System.out.println("**** llegó la petición *****");
        return ResponseEntity.ok(reportService.getAll());
    }

    @PostMapping("/admin/squad")
    public ResponseEntity<SquadResponseDTO> createSquad(@RequestBody SquadRequestDTO dto){
        return ResponseEntity.ok(service.createSquad(dto));
    }
    @GetMapping("/admin/squads")
    public ResponseEntity<List<SquadResponseDTO>>getAllSquads(){
        return ResponseEntity.ok(service.getAll());
    }
    @DeleteMapping("/admin/squad/{id}/delete")
    public ResponseEntity<SquadResponseDTO> deleteSquadById(@PathVariable Long id){
        System.out.println("**** llegó la petición *****");
        return ResponseEntity.ok(service.deleteById(id));
    }
    @GetMapping("/admin/squad/{id}")
    public ResponseEntity<SquadResponseDTO> getSquadById(@PathVariable Long id){
            return ResponseEntity.ok(service.getById(id));
    }
    @PutMapping("/admin/report/{id}/assign/{squadId}")
    public ResponseEntity<ReportResponseDto>assignSquadToReport(@PathVariable Long id,
                                                                @PathVariable Long squadId){
            System.out.println("**** llegó la petición *****");
            return ResponseEntity.ok(reportService.assignSquadToReport(id, squadId));
    }
    @PutMapping("/admin/squad/{id}")
    public ResponseEntity<SquadResponseDTO> updateSquad(@PathVariable Long id,
                                                        @RequestBody SquadRequestDTO request){
        return ResponseEntity.ok(service.updateSquad(request, id));
    }
    @GetMapping("/admin/report")
    public ResponseEntity<List<ReportResponseDto>> getReportsByStatus(@RequestParam String status){
        return ResponseEntity.ok(reportService.getReportsByStatus(status));
    }
    @PutMapping("/status/{reportId}")
    public ResponseEntity<ReportResponseDto> updateReportStatus(@PathVariable Long reportId,
                                                                @RequestParam Status status,
                                                                @RequestBody(required = false) ResourcesUsedDto resourcesUsed){
        System.out.println("Llegó la petición a updateReportStatus");
        return ResponseEntity.ok(reportService.updateReportStatus(reportId, status, resourcesUsed));
    }
}