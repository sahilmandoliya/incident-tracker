import type { Incident } from "../types/incident";

export const MOCK_INCIDENTS: Incident[] = Array.from({ length: 57 }).map(
    (_, i) => ({
        id: String(i + 1),
        title: `Service Issue ${i + 1}`,
        service: ["Auth", "Payments", "Search"][i % 3],
        severity: ["SEV1", "SEV2", "SEV3", "SEV4"][i % 4] as any,
        status: ["OPEN", "MITIGATED", "RESOLVED"][i % 3] as any,
        owner: `engineer${(i % 5) + 1}@company.com`,
        summary: "Dummy incident summary",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    })
);
