package com.sahil.incidenttracker.backend.specification;

import org.springframework.data.jpa.domain.Specification;
import com.sahil.incidenttracker.backend.entity.Incident;

public class IncidentSpecification {

    public static Specification<Incident> titleContains(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isEmpty()) return null;
            return cb.like(cb.lower(root.get("title")),
                    "%" + search.toLowerCase() + "%");
        };
    }

    public static Specification<Incident> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isEmpty()) return null;
            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Incident> hasSeverity(String severity) {
        return (root, query, cb) -> {
            if (severity == null || severity.isEmpty()) return null;
            return cb.equal(root.get("severity"), severity);
        };
    }

    public static Specification<Incident> hasService(String service) {
        return (root, query, cb) -> {
            if (service == null || service.isEmpty()) return null;
            return cb.equal(root.get("service"), service);
        };
    }
}
