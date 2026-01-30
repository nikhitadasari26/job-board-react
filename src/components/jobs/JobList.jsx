import { JobCard } from './JobCard';
import clsx from 'clsx';
import { useJobStore } from '../../store/useJobStore';

export function JobList({ jobs }) {
    const { viewMode } = useJobStore();

    if (jobs.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
            </div>
        );
    }

    return (
        <div
            data-testid="job-list-container"
            data-view-mode={viewMode}
            className={clsx(
                viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
            )}
        >
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} viewMode={viewMode} />
            ))}
        </div>
    );
}
