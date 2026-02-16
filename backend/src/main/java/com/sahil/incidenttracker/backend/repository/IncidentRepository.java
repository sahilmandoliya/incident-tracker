package com.sahil.incidenttracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.UUID;
import com.sahil.incidenttracker.backend.entity.Incident;

public interface IncidentRepository extends
        JpaRepository<Incident, UUID>,
        JpaSpecificationExecutor<Incident> {
}
