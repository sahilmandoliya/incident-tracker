# Incident Tracker

A full-stack incident management application designed for engineers to create, track, and resolve production incidents efficiently.

## 🚀 Features

-   **Incident Management**: Create, update, and view incidents with rich details.
-   **Advanced Filtering**: Filter by Status, Severity, and Service.
-   **Search**: Server-side debounced search functionality.
-   **Pagination**: Efficient server-side pagination for large datasets.
-   **Data Seeding**: Automated seeding of ~200 varied records for testing.
-   **Responsive Design**: Polished, professional UI that works on various screen sizes.
-   **Docker Support**: Full containerization for easy deployment.

## 🛠 Tech Stack

### Backend
-   **Java 21**, **Spring Boot 3.3+**: Robust, production-grade framework.
-   **H2 Database** (Dev) / **PostgreSQL** (Prod): In-memory for speed during dev, Postgres for reliability in prod.
-   **Spring Data JPA**: For efficient database interactions and dynamic queries (`JpaSpecificationExecutor`).
-   **Lombok**: To reduce boilerplate code.
-   **Maven**: Dependency management.

### Frontend
-   **React 18**, **TypeScript**: Type-safe, component-based UI.
-   **Vite**: Fast build tool and dev server.
-   **TanStack Query (React Query)**: Powerful asynchronous state management and caching.
-   **Axios**: HTTP client.
-   **CSS Modules / Variables**: Clean, maintainable design system without heavy framework dependencies.

---

## 🏃‍♂️ Getting Started

### Prerequisites
-   Node.js 18+
-   Java 21
-   Docker (optional, for containerized run)

### Quick Start (Docker) - **Recommended**
Run the entire stack (Frontend + Backend + Database) with one command:

```bash
docker-compose up --build
```
-   **Frontend**: [http://localhost](http://localhost)
-   **Backend**: [http://localhost:8080](http://localhost:8080)

### Manual Setup

#### 1. Backend
```bash
cd backend
./mvnw spring-boot:run
```
The server will start on port `8080` with an H2 in-memory database seeded with data.

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173).

---

## 📡 API Overview

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/incidents` | Fetch paginated incidents | `page`, `size`, `sort`, `search`, `status`, `severity`, `serviceName` |
| `POST` | `/api/incidents` | Create a new incident | - |
| `GET` | `/api/incidents/{id}` | Get incident details | - |
| `PATCH` | `/api/incidents/{id}` | Update incident (status, etc.) | - |

**Example Search & Filter Query:**
```
GET /api/incidents?page=0&size=10&sort=createdAt,desc&status=OPEN&severity=SEV1&search=database
```

---

## 📐 Design Decisions & Tradeoffs

### 1. Monorepo Structure
**Decision**: Keep frontend and backend in a single repository.
**Reasoning**: Simplifies dependency management for a project of this size, allows for a single `docker-compose` orchestration, and keeps documentation unified.
**Tradeoff**: CI/CD pipelines need to be slightly smarter to only build changed paths (e.g., frontend vs backend deployments).

### 2. State Management (Server State vs UI State)
**Decision**: Used **TanStack Query** for data fetching instead of Redux/Context.
**Reasoning**: Most "state" in this app is actually server cache. React Query handles caching, invalidation, loading states, and deduplication out of the box, reducing boilerplate significantly compared to Redux.
**Tradeoff**: Adds a dependency, but the detailed control over cache invalidation (e.g., invalidating list after update) is worth it.

### 3. CSS Variables over Tailwind
**Decision**: Created a custom design system using CSS Variables.
**Reasoning**: Demonstrated core CSS understanding and created a "semantic" design system (e.g., `--status-open-bg`) that makes theming and maintenance easy without the build overhead of Tailwind for a small project.
**Tradeoff**: Writing CSS manually takes slightly longer than utility classes initially but offers cleaner markup.

### 4. Dynamic Filtering (Backend)
**Decision**: Used `Specification` pattern in Spring Data JPA.
**Reasoning**: Allows combining dynamic filters (search, status, severity) safely and efficiently without string concatenation or writing multiple repository methods.
**Tradeoff**: Slightly more complex setup than basic CRUD methods, but scales much better as filter options grow.

---

## 🔮 Future Improvements

With more time, I would implement:

1.  **Authentication/Authorization**: Integrate Spring Security and JWT/OAuth2 to track *who* created or updated an incident.
2.  **Real-time Updates**: Functionality (WebSockets/SSE) to push updates to the dashboard when a new incident is created by another user.
3.  **Audit Logging**: A dedicated table to track state changes (e.g., "Status changed from OPEN to RESOLVED by Sahil at 10:00 AM").
4.  **Testing**:
    -   **Backend**: Add integration tests using `Testcontainers` for PostgreSQL.
    -   **Frontend**: Add Cypress E2E tests for critical flows (Create -> Filter -> Resolve).
5.  **Analytics Dashboard**: Visual charts showing "Incidents per Service" or "Mean Time to Resolution (MTTR)".

---
