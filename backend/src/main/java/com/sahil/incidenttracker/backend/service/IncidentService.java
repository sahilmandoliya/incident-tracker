package com.sahil.incidenttracker.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.UUID;

import com.sahil.incidenttracker.backend.entity.Incident;
import com.sahil.incidenttracker.backend.repository.IncidentRepository;
import com.sahil.incidenttracker.backend.dto.*;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository repo;

    public Page<IncidentResponseDTO> getAll(Pageable pageable,
                                            Specification<Incident> spec) {

        return repo.findAll(spec, pageable)
                .map(this::toResponseDTO);
    }

    public IncidentResponseDTO getById(UUID id) {
        return toResponseDTO(repo.findById(id).orElseThrow());
    }

    public IncidentResponseDTO create(IncidentRequestDTO dto) {

        Incident incident = Incident.builder()
                .title(dto.getTitle())
                .service(dto.getService())
                .severity(dto.getSeverity())
                .status(dto.getStatus())
                .owner(dto.getOwner())
                .summary(dto.getSummary())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return toResponseDTO(repo.save(incident));
    }

    public IncidentResponseDTO update(UUID id, IncidentRequestDTO dto) {

        Incident existing = repo.findById(id).orElseThrow();

        if (dto.getStatus() != null) {
            existing.setStatus(dto.getStatus());
        }
        if (dto.getOwner() != null) {
            existing.setOwner(dto.getOwner());
        }
        if (dto.getSummary() != null) {
            existing.setSummary(dto.getSummary());
        }
        if (dto.getTitle() != null) {
            existing.setTitle(dto.getTitle());
        }
        if (dto.getService() != null) {
            existing.setService(dto.getService());
        }
        if (dto.getSeverity() != null) {
            existing.setSeverity(dto.getSeverity());
        }

        existing.setUpdatedAt(LocalDateTime.now());

        return toResponseDTO(repo.save(existing));
    }

    private IncidentResponseDTO toResponseDTO(Incident i) {
        return IncidentResponseDTO.builder()
                .id(i.getId())
                .title(i.getTitle())
                .service(i.getService())
                .severity(i.getSeverity())
                .status(i.getStatus())
                .owner(i.getOwner())
                .summary(i.getSummary())
                .createdAt(i.getCreatedAt())
                .updatedAt(i.getUpdatedAt())
                .build();
    }
}
