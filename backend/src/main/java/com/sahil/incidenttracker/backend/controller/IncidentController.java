package com.sahil.incidenttracker.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import jakarta.validation.Valid;

import java.util.UUID;

import com.sahil.incidenttracker.backend.dto.*;
import com.sahil.incidenttracker.backend.service.IncidentService;
import com.sahil.incidenttracker.backend.specification.IncidentSpecification;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
@CrossOrigin
public class IncidentController {

    private final IncidentService service;

    @GetMapping
    public Page<IncidentResponseDTO> getIncidents(
            Pageable pageable,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String serviceName
    ) {

        Specification<com.sahil.incidenttracker.backend.entity.Incident> spec =
                Specification.where(IncidentSpecification.titleContains(search))
                        .and(IncidentSpecification.hasStatus(status))
                        .and(IncidentSpecification.hasSeverity(severity))
                        .and(IncidentSpecification.hasService(serviceName));

        return service.getAll(pageable, spec);
    }

    @PostMapping
    public IncidentResponseDTO create(
            @Valid @RequestBody IncidentRequestDTO dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public IncidentResponseDTO getOne(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PatchMapping("/{id}")
    public IncidentResponseDTO update(
            @PathVariable UUID id,
            @RequestBody IncidentRequestDTO dto) {
        return service.update(id, dto);
    }
}
