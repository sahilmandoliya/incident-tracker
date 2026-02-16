package com.sahil.incidenttracker.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;
import com.sahil.incidenttracker.backend.enumtype.*;

@Data
@Builder
public class IncidentResponseDTO {

    private UUID id;
    private String title;
    private String service;
    private Severity severity;
    private IncidentStatus status;
    private String owner;
    private String summary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
