package com.sahil.incidenttracker.backend.entity;

import com.sahil.incidenttracker.backend.enumtype.IncidentStatus;
import com.sahil.incidenttracker.backend.enumtype.Severity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "incidents",
        indexes = {
                @Index(name = "idx_status", columnList = "status"),
                @Index(name = "idx_severity", columnList = "severity"),
                @Index(name = "idx_createdAt", columnList = "createdAt")
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String service;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status;

    private String owner;
    private String summary;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}


