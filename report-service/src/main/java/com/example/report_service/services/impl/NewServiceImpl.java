package com.example.report_service.services.impl;
import com.example.report_service.dtos.NewDto;
import com.example.report_service.dtos.NewResponseDto;
import com.example.report_service.entity.NewEntity;
import com.example.report_service.repository.NewRepository;
import com.example.report_service.services.interfaces.NewService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
@Service
@Primary
public class NewServiceImpl implements NewService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NewRepository newRepository;
    @Override
    public NewResponseDto createNew(NewDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }
        NewEntity entity = modelMapper.map(dto, NewEntity.class);
        entity.setDate(OffsetDateTime.now());
        NewEntity saved = newRepository.save(entity);
        return modelMapper.map(saved, NewResponseDto.class);
    }

    @Override
    public List<NewResponseDto> getAllNews() {
        return newRepository.findAll()
                .stream()
                .map(x -> modelMapper.map(x, NewResponseDto.class))
                .toList();
    }

    @Override
    @Transactional
    public void deleteNew(Long id) {
        NewEntity entity = newRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Noticia con id "+ id +"no encontrada"));
        newRepository.delete(entity);
    }
}