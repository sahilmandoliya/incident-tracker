
# Sahil Mandoliya (Incident Tracker - Software Engineer Assignment)

## 🔗 Submission Links

**GitHub Repository:**
[https://github.com/sahilmandoliya/incident-tracker](https://github.com/sahilmandoliya/incident-tracker)

**Live Demo (Frontend - Vercel):**
[https://incident-tracker-topaz.vercel.app](https://incident-tracker-topaz.vercel.app)

**Backend API (Render):**
[https://incident-tracker-h1od.onrender.com](https://incident-tracker-h1od.onrender.com)

**Database:**
PostgreSQL (Managed on Render)

## ✅ Functional Requirements Check

- **Incident Creation:** Full creation workflow with validation.
- **Data Fetching:** Efficient data retrieval from PostgreSQL.
- **Pagination:** Server-side pagination implemented for scalability.
- **Search & Filter:** Server-side filtering by Service, Status, Severity, and debounced Title search.
- **Incident Details:** View and update incident status.
- **Data Seeding:** Automated seeder populates ~200 records on startup.

## 🛠️ Tech Stack & Decisions

- **Frontend:** React, TypeScript, Vite, TanStack Query (caching/state)
- **Backend:** Java 21, Spring Boot 3, Spring Data JPA
- **Database:** PostgreSQL (Production), H2 (Local Dev).
- **Deployment:** Dockerized applications deployed on Vercel (Frontend) and Render (Backend).

## 🏃♂️ Setup & Run Instructions

### Quick Start (Docker) - Recommended

Run the entire stack (Frontend + Backend + Database) with one command:

```bash
docker-compose up --build
```

This will start:
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:8080` (H2 Database)

### Manual Setup

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/incidents` | Fetch paginated list (supports filtering & sorting) |
| `POST` | `/api/incidents` | Create a new incident |
| `GET` | `/api/incidents/{id}` | Get incident details |
| `PATCH` | `/api/incidents/{id}` | Get incident details (Update status) |

## 📐 Design Decisions & Tradeoffs

- **Strategic Filtering:** Used Spring Data JPA `Specification` pattern to handle dynamic, complex filtering requirements efficiently and type-safely.
- **Monorepo Structure:** Kept frontend and backend in a single repo to simplify orchestration and codebase navigation, though it requires smarter CI/CD pipelines.
- **TanStack Query:** Chose over Redux for state management because the app primarily deals with server state (caching, invalidation, loading), which React Query handles natively.
- **CSS Variables**

## 🔮 Future Improvements

- **Authentication:** Add JWT/OAuth2 to track user actions and restrict access.
- **Real-time Updates:** Implement WebSockets to push new incidents to the dashboard instantly without refreshing.
- **Audit Logging:** dedicated table to track state transitions (e.g., who changed status from OPEN to RESOLVED).
- **E2E Testing:** Add Cypress/Playwright tests for critical user flows.

Thank you !
