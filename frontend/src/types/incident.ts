export type Severity = "SEV1" | "SEV2" | "SEV3" | "SEV4";

export type IncidentStatus = "OPEN" | "MITIGATED" | "RESOLVED";

export type ServiceType = "Auth" | "Payment" | "Notification" | "Analytics" | "Database";

export interface Incident {
  id: string;
  title: string;
  service: string; // Backend returns string, but we can type coerce or validate if needed. Keeping as string for flexibility but using ServiceType for inputs.
  severity: Severity;
  status: IncidentStatus;
  owner?: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

export type IncidentRequest = {
  title: string;
  service: string;
  severity: Severity;
  status: IncidentStatus;
  owner?: string;
  summary?: string;
};
