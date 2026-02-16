import axios from "axios";
import type { Incident, IncidentRequest } from "../types/incident";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

export type IncidentQueryParams = {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  severity?: string;
  status?: string;
  serviceName?: string;
};

export type IncidentPage = {
  content: Incident[];
  number: number;
  totalPages: number;
  totalElements: number;
};

export const fetchIncidents = async (
  params: IncidentQueryParams
): Promise<IncidentPage> => {
  const res = await api.get("/incidents", { params });
  return res.data;
};

export const createIncident = async (data: IncidentRequest) => {
  const res = await api.post("/incidents", data);
  return res.data;
};

export const updateIncident = async (
  id: string,
  data: Partial<IncidentRequest>
) => {
  const res = await api.patch(`/incidents/${id}`, data);
  return res.data;
};

