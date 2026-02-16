import { useState } from "react";
import Modal from "../common/Modal";
import type { Incident } from "../../types/incident";
import { updateIncident } from "../../api/IncidentApi";
import { useQueryClient } from "@tanstack/react-query";
import "./IncidentDetailModal.css";

type Props = {
  incident: Incident;
  onClose: () => void;
};

export default function IncidentDetailModal({ incident, onClose }: Props) {
  const qc = useQueryClient();

  const [status, setStatus] = useState(incident.status);
  const [owner, setOwner] = useState(incident.owner || "");
  const [summary, setSummary] = useState(incident.summary || "");

  const save = async () => {
    await updateIncident(incident.id, {
      status,
      owner,
      summary,
    });
    qc.invalidateQueries({ queryKey: ["incidents"] });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="detail">
        <h3>{incident.title}</h3>

        <div className="field">
          <label>Service</label>
          <p>{incident.service}</p>
        </div>

        <div className="field">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
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
          />
        </div>

        <div className="field">
          <label>Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="primary-btn" onClick={save}>
            Save Changes
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
