package com.example.inventory_service.repositories;
import com.example.inventory_service.entities.ResourceEntity;
import com.example.inventory_service.enums.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends JpaRepository<ResourceEntity, Long> {
    List<ResourceEntity> findByArea(Area area);
    List<ResourceEntity> findByActiveTrue();
}