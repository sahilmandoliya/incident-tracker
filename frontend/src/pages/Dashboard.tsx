import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import FiltersBar from "../components/common/FiltersBar";
import Pagination from "../components/common/Pagination";
import IncidentTable from "../components/IncidentTable/IncidentTable";
import IncidentFormModal from "../components/IncidentFormModal/IncidentFormModal";
import IncidentDetailModal from "../components/IncidentDetailModal/IncidentDetailModal";

import { fetchIncidents } from "../api/IncidentApi";
import type { IncidentQueryParams } from "../api/IncidentApi";
import type { Incident, IncidentStatus, Severity } from "../types/incident";
import { useDebounce } from "../hooks/useDebounce";
import "../App.css";

export default function Dashboard() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] =
        useState<Incident | null>(null);

    const [searchInput, setSearchInput] = useState("");

    const debouncedSearch = useDebounce(searchInput, 300);

    const [params, setParams] = useState<IncidentQueryParams>({
        page: 0,
        size: 10,
        sort: "createdAt,desc",
    });

    useEffect(() => {
        setParams((p) => ({
            ...p,
            search: debouncedSearch,
            page: 0,
        }));
    }, [debouncedSearch]);

    const { data, isLoading } = useQuery({
        queryKey: ["incidents", params],
        queryFn: () => fetchIncidents(params),
    });

    const handleSort = (field: string) => {
        setParams((p) => {
            const currentSort = p.sort || "";
            const [currentField, currentDir] = currentSort.split(",");
            let newDir = "asc";
            if (currentField === field && currentDir === "asc") {
                newDir = "desc";
            }
            return {
                ...p,
                sort: `${field},${newDir}`,
            };
        });
    };

    const handleFilterApply = (filters: {
        service: string;
        status: IncidentStatus | "";
        severity: Severity | "";
    }) => {
        setParams((p) => ({
            ...p,
            serviceName: filters.service || undefined,
            status: filters.status || undefined,
            severity: filters.severity || undefined,
            page: 0,
        }));
    };

    const handlePageChange = (page: number) => {
        setParams((p) => ({ ...p, page }));
    };

    return (
        <div className="page">
            <div className="card">
                <div className="card-header">
                    <h3>Incident Tracker</h3>
                    <button
                        className="primary-btn"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        New Incident ▾
                    </button>
                </div>

                <FiltersBar
                    search={searchInput}
                    setSearch={setSearchInput}
                    onFilterApply={handleFilterApply}
                />

                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <IncidentTable
                            data={data?.content || []}
                            onRowClick={(i) => setSelectedIncident(i)}
                            onSort={handleSort}
                        />

                        <Pagination
                            page={data?.number || 0}
                            totalPages={data?.totalPages || 0}
                            onChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {isCreateOpen && (
                <IncidentFormModal onClose={() => setIsCreateOpen(false)} />
            )}

            {selectedIncident && (
                <IncidentDetailModal
                    incident={selectedIncident}
                    onClose={() => setSelectedIncident(null)}
                />
            )}
        </div>
    );
}
