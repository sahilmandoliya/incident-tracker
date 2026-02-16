package com.sahil.incidenttracker.backend.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;
import com.sahil.incidenttracker.backend.enumtype.*;

@Data
public class IncidentRequestDTO {

    @jakarta.validation.constraints.NotBlank(message = "Title is required")
    private String title;

    @jakarta.validation.constraints.NotBlank(message = "Service is required")
    private String service;

    @jakarta.validation.constraints.NotNull(message = "Severity is required")
    private Severity severity;

    @jakarta.validation.constraints.NotNull(message = "Status is required")
    private IncidentStatus status;

    @Email
    private String owner;

    private String summary;
}
