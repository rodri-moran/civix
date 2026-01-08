package com.example.report_service.repository;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    List<ReportEntity> getReportEntitiesByUserId(Long userId);
    List<ReportEntity> findByStatus(Status status);
    @Query("select r.status, count(r) from ReportEntity r group by r.status")
    List<Object[]> countByStatusGrouped();
    @Query("select r.squad.name, count(r) from ReportEntity r group by r.squad.name")
    List<Object[]> countBySquad();
    List<ReportEntity> findAllByStatusOrResolvedAtIsNotNull(Status status);

    //getAverageResolutionTimeBySquad
    @Query("SELECT r.squad.name, r.createdAt, r.resolvedAt FROM ReportEntity r WHERE r.resolvedAt IS NOT NULL")
    List<Object[]> getResolutionData();


    List<ReportEntity> findBySquad_SupervisorUserId(Long supervisorUserId);
}