import { useState } from "react";
import Modal from "../common/Modal";
import "./IncidentFormModal.css";
import type { Severity, IncidentStatus } from "../../types/incident";
import { createIncident } from "../../api/IncidentApi";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onClose: () => void;
};

export default function IncidentFormModal({ onClose }: Props) {
  const qc = useQueryClient();

  const [title, setTitle] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [severity, setSeverity] = useState<Severity>("SEV1");
  const [status, setStatus] = useState<IncidentStatus>("OPEN");
  const [owner, setOwner] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const submit = async () => {
    await createIncident({
      title,
      service,
      severity,
      status,
      owner,
      summary,
    });
    qc.invalidateQueries({ queryKey: ["incidents"] });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="form">
        <h3>Create New Incident</h3>

        <div className="field">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue Title..."
          />
        </div>

        <div className="field">
          <label>Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="" disabled>Select Service</option>
            <option value="Auth">Auth</option>
            <option value="Payment">Payment</option>
            <option value="Notification">Notification</option>
            <option value="Analytics">Analytics</option>
            <option value="Database">Database</option>
          </select>
        </div>

        <div className="field">
          <label>Severity</label>

          <div className="severity">
            {(["SEV1", "SEV2", "SEV3", "SEV4"] as Severity[]).map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  checked={severity === s}
                  onChange={() => setSeverity(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as IncidentStatus)}
          >
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        <div className="field">
          <label>Assigned To</label>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="field">
          <label>Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Describe the incident..."
          />
        </div>

        <div className="actions">
          <button className="primary-btn" onClick={submit}>
            Create Incident
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
