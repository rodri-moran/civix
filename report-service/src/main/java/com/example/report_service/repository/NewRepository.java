package com.example.report_service.repository;

import com.example.report_service.entity.NewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewRepository extends JpaRepository<NewEntity, Long> {
}
