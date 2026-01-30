import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import { FilterSidebar } from '../components/layout/FilterSidebar';
import { JobList } from '../components/jobs/JobList';
import { Navbar } from '../components/layout/Navbar';
import { ViewToggle } from '../components/jobs/ViewToggle';
import { SortSelect } from '../components/jobs/SortSelect';
import { Pagination } from '../components/jobs/Pagination';
import { useJobStore } from '../store/useJobStore';
import mockData from '../data/mock-data.json';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

const fetcher = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockData.jobs), 300); 
  });

export function Home() {
  const { data: jobs, error, isLoading } = useSWR('jobs', fetcher);
  const { filters, viewMode, setViewMode } = useJobStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('date');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const JOBS_PER_PAGE = 10;

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    let result = jobs.filter((job) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany =
          job.companyId.toString().includes(query) ||
          mockData.companies
            .find((c) => c.id === job.companyId)
            ?.name.toLowerCase()
            .includes(query);

        if (!matchesTitle && !matchesCompany) return false;
      }

      if (
        filters.jobType.length > 0 &&
        !filters.jobType.includes(job.jobType)
      ) {
        return false;
      }

      if (
        filters.experienceLevel.length > 0 &&
        !filters.experienceLevel.includes(job.experienceLevel)
      ) {
        return false;
      }

      if (filters.skills.length > 0) {
        const hasAllSkills = filters.skills.every((skill) =>
          job.skills.includes(skill)
        );
        if (!hasAllSkills) return false;
      }

      if (
        job.salary < filters.salaryRange[0] ||
        job.salary > filters.salaryRange[1]
      ) {
        return false;
      }

      return true;
    });

    result.sort((a, b) => {
      switch (sortOption) {
        case 'salary-desc':
          return b.salary - a.salary;
        case 'salary-asc':
          return a.salary - b.salary;
        case 'relevance':
          if (filters.search) {
            const query = filters.search.toLowerCase();
            const aTitleMatch = a.title.toLowerCase() === query;
            const bTitleMatch = b.title.toLowerCase() === query;
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
          }
          return 0;
        case 'date':
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

    return result;
  }, [jobs, filters, sortOption]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  if (error) return <div>failed to load</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="secondary"
              onClick={() =>
                setIsMobileFiltersOpen(!isMobileFiltersOpen)
              }
              className="w-full"
            >
              {isMobileFiltersOpen ? (
                <X size={18} className="mr-2" />
              ) : (
                <Menu size={18} className="mr-2" />
              )}
              {isMobileFiltersOpen
                ? 'Close Filters'
                : 'Show Filters'}
            </Button>
          </div>

          {/* Sidebar */}
          <aside
            className={`lg:w-80 shrink-0 lg:block ${
              isMobileFiltersOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isLoading
                    ? 'Loading jobs...'
                    : `${filteredJobs.length} Jobs Found`}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showing based on your preferences
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <SortSelect
                  value={sortOption}
                  onChange={setSortOption}
                />
                <ViewToggle
                  currentMode={viewMode}
                  onToggle={setViewMode}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-white rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <>
                <JobList jobs={paginatedJobs} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
