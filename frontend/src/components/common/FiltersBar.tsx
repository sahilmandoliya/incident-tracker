import React, { useState } from "react";
import "./common.css";
import type { IncidentStatus, ServiceType, Severity } from "../../types/incident";

const serviceOptions: ServiceType[] = ["Auth", "Payment", "Notification"];
const statusOptions: IncidentStatus[] = ["OPEN", "MITIGATED", "RESOLVED"];
const severityOptions: Severity[] = ["SEV1", "SEV2", "SEV3", "SEV4"];

interface FiltersBarProps {
  search: string;
  setSearch: (s: string) => void;
  onFilterApply: (filters: {
    service: string;
    status: IncidentStatus | "";
    severity: Severity | "";
  }) => void;
}

export default function FiltersBar({ search, setSearch, onFilterApply }: FiltersBarProps) {
  const [service, setService] = useState<string>("");
  const [status, setStatus] = useState<IncidentStatus | "">("");
  const [severity, setSeverity] = useState<Severity | "">("");

  const handleFilterClick = () => {
    onFilterApply({ service, status, severity });
  };

  return (
    <div className="filters">
      <div className="row">
        <span>Service ▾</span>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">All Services</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <span>Status ▾</span>
        <select value={status} onChange={(e) => setStatus(e.target.value as IncidentStatus)}>
          <option value="">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <span>Severity ▾</span>
        <select value={severity} onChange={(e) => setSeverity(e.target.value as Severity)}>
          <option value="">All Severities</option>
          {severityOptions.map((severity) => (
            <option key={severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="filter-btn" onClick={handleFilterClick}>
          Filter
        </button>
      </div>
    </div>
  );
}