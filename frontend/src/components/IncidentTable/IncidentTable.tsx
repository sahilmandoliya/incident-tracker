import type { Incident } from "../../types/incident";
import StatusBadge from "../common/StatusBadge"; // Import the StatusBadge component
import "./IncidentTable.css";

export default function IncidentTable({
  data,
  onRowClick,
  onSort,
}: {
  data: Incident[];
  onRowClick: (i: Incident) => void;
  onSort: (f: string) => void;
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title ⇅</th>
          <th onClick={() => onSort("service")}>Service ⇅</th>
          <th onClick={() => onSort("severity")}>Severity ⇅</th>
          <th onClick={() => onSort("status")}>Status ⇅</th>
          <th onClick={() => onSort("createdAt")}>Created At ⇅</th>
          <th onClick={() => onSort("owner")}>Owner ⇅</th>
        </tr>
      </thead>

      <tbody>
        {data.map((i) => (
          <tr key={i.id} onClick={() => onRowClick(i)}>
            <td>{i.title}</td>
            <td>{i.service}</td>
            <td>{i.severity}</td>
            <td>
              <StatusBadge text={i.status} />
            </td>
            <td>{new Date(i.createdAt).toLocaleDateString()}</td>
            <td>{i.owner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
