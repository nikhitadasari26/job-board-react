# React Job Board

A feature-rich job board application built with React, Vite, and Tailwind CSS.

## Features

- **Job Listings**: View jobs in Grid or List layout.
- **Advanced Filtering**:
  - Filter by Job Type (Remote, Hybrid, Onsite)
  - Filter by Experience Level
  - Filter by Skills (Multi-select)
  - Filter by Salary Range
- **Search**: Real-time search by title or company.
- **Sorting**: Sort by Date, Salary, or Relevance.
- **Bookmarks**: Save jobs to your tracker (persisted in Local Storage).
- **Tracker**: Dedicated page for saved jobs.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Zustand (State Management)
- SWR (Data Fetching)
- React Router DOM
- React Select
- RC Slider
- Docker

## Setup & Running

### Prerequisites

- Node.js 18+
- Docker (optional)

### Using Docker (Recommended)

The application is fully containerized.

```bash
docker-compose up --build
```
The app will be available at http://localhost:3000

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

## Project Structure

- `/src/components`: Reusable UI components.
- `/src/pages`: Page components (Home, Tracker).
- `/src/store`: Global state management.
- `/src/data`: Mock data.
