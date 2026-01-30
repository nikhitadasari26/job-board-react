
#  React Job Board — Advanced Filtering & Bookmarking

A production-ready, fully containerized **Job Board Application** built with **React, Vite, Tailwind CSS, Zustand, and SWR**.  
This project demonstrates modern frontend architecture, advanced client-side filtering, persistent bookmarking, and Docker-based deployment.

---

## 📌 Project Overview

This application allows users to browse job listings efficiently using **search, advanced filters, sorting, pagination, and bookmarking**.  
All data is loaded from a local mock JSON file and managed client-side, simulating real-world API-driven behavior.

The project is designed to meet **automated evaluation requirements**, including:
- `data-testid` attributes for UI testing
- Full Docker containerization
- LocalStorage persistence
- Healthcheck for container readiness

---

##  Features

### Job Browsing
- Grid and List view toggle
- Pagination (10 jobs per page)
- Responsive layout for mobile, tablet, and desktop

### Advanced Filtering
- Filter by **Job Type** (Remote, Hybrid, Onsite)
- Filter by **Experience Level**
- Filter by **Skills** (multi-select — must match ALL selected skills)
- Filter by **Salary Range** (range slider)
- Active filter badge count
- One-click **Clear All Filters**

### Search & Sorting
- Debounced search by **job title or company name**
- Sort by:
  - Newest First (Date)
  - Salary (High → Low)
  - Salary (Low → High)
  - Relevance

### Bookmarking & Tracker
- Bookmark jobs using LocalStorage
- Visual indicator for bookmarked jobs
- Dedicated **/tracker** page showing only saved jobs

### Developer & Deployment Ready
- SWR for async data fetching and caching
- Zustand for global state management
- Docker multi-stage build
- NGINX static file serving
- Built-in container healthcheck

---

##  Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Data Fetching | SWR |
| UI Components | React Select, RC Slider |
| Routing | React Router DOM |
| Deployment | Docker, NGINX |

---

## 📂 Project Structure

```
job-board-react/
│
├── public/                # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page views (Home, Tracker)
│   ├── store/           # Zustand global state
│   ├── data/            # Mock JSON database
│   └── main.jsx        # App entry point
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

##  Setup & Running

### Prerequisites
- Node.js 18+
- Docker (recommended for evaluation and production testing)

---

##  Run Using Docker (Recommended)

The application is fully containerized and evaluator-ready.

### Build and Run:
```bash
docker-compose up --build -d
```

### Access App:
```
http://localhost:3000
```

### Check Container Health:
```bash
docker ps
```
You should see:
```
(healthy)
```

---

##  Run Locally (Development Mode)

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

---

##  Automated Test Verification

This project includes `data-testid` attributes for automated evaluation.

### Example Test Commands (Browser Console)

#### Check job cards loaded
```js
document.querySelectorAll('[data-testid^="job-card-"]').length
```

#### Check view mode
```js
document.querySelector('[data-testid="job-list-container"]')
  .getAttribute('data-view-mode')
```

#### Trigger salary sort
```js
document.querySelector('[data-testid="sort-salary-desc"]').value = 'salary-desc';
document.querySelector('[data-testid="sort-salary-desc"]')
  .dispatchEvent(new Event('change', { bubbles: true }));
```

---

##  Environment Variables

This project does not require runtime environment variables.  
An example file is provided for compliance:

```
.env.example
```

---

##  Submission Ready Checklist

- ✅ 20+ Jobs in `mock-data.json`
- ✅ Dockerized with Healthcheck
- ✅ `data-testid` attributes implemented
- ✅ Pagination, Filtering, Sorting, Bookmarking
- ✅ `/tracker` route implemented
- ✅ README with setup instructions

---

##  Author

**Nikhita Dasari**  
Frontend Developer

---

##  License

This project is intended for educational and evaluation purposes.
