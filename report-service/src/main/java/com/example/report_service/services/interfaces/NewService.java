package com.example.report_service.services.interfaces;

import com.example.report_service.dtos.NewDto;
import com.example.report_service.dtos.NewResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NewService {
    NewResponseDto createNew(NewDto dto);
    List<NewResponseDto> getAllNews();
    void deleteNew(Long id);
}
