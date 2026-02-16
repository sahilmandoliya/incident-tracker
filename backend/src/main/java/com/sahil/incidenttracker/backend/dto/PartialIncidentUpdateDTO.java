package com.sahil.incidenttracker.backend.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;
import com.sahil.incidenttracker.backend.enumtype.*;

@Data
public class PartialIncidentUpdateDTO {

    private String title;

    private String service;

    private Severity severity;

    private IncidentStatus status;

    @Email
    private String owner;

    private String summary;
}