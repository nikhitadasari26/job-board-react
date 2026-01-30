import { MapPin, Building2, DollarSign, Calendar, Bookmark } from 'lucide-react';
import clsx from 'clsx';
import { useJobStore } from '../../store/useJobStore';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function JobCard({ job, viewMode = 'grid' }) {
    const { bookmarks, toggleBookmark } = useJobStore();
    const isBookmarked = bookmarks.includes(job.id);

    const formatSalary = (salary) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(salary);
    };

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const days = Math.floor(seconds / 86400);

        if (days > 0) return `${days}d ago`;
        const hours = Math.floor(seconds / 3600);
        if (hours > 0) return `${hours}h ago`;
        return 'Just now';
    };

    return (
        <div
            data-testid={`job-card-${job.id}`}
            className={clsx(
                'group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200',
                viewMode === 'list' ? 'flex flex-col sm:flex-row gap-4 p-5' : 'flex flex-col p-5'
            )}
        >
            <div className={clsx('flex-1', viewMode === 'list' && 'min-w-0')}>
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                            <Building2 size={14} />
                            <span>{job.companyId}</span> {/* In real app map to company name */}
                        </div>
                    </div>
                    {viewMode === 'grid' && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className={clsx("text-slate-400 hover:text-brand-500", isBookmarked && "text-brand-500 fill-current")}
                            onClick={() => toggleBookmark(job.id)}
                            data-testid={`bookmark-btn-${job.id}`}
                            data-bookmarked={isBookmarked}
                        >
                            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600 my-3">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        {job.location} ({job.jobType})
                    </div>
                    <div className="flex items-center gap-1.5" data-testid="job-salary">
                        <DollarSign size={14} className="text-slate-400" />
                        {formatSalary(job.salary)}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        {timeAgo(job.postedDate)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">{job.experienceLevel}</Badge>
                    {job.skills.map(skill => (
                        <Badge key={skill} variant="primary" className="bg-brand-50 text-brand-700 hover:bg-brand-100">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>

            {viewMode === 'list' && (
                <div className="flex flex-col justify-between items-end pl-4 border-l border-slate-100 ml-4 max-sm:border-0 max-sm:ml-0 max-sm:pl-0 max-sm:items-start max-sm:mt-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={clsx("text-slate-400 hover:text-brand-500 mb-auto max-sm:hidden", isBookmarked && "text-brand-500 fill-current")}
                        onClick={() => toggleBookmark(job.id)}
                        data-testid={`bookmark-btn-${job.id}`}
                        data-bookmarked={isBookmarked}
                    >
                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto">Apply Now</Button>
                </div>
            )}

            {/* Mobile/List Bookmark button if needed, but grid handles it in top right. List handles it in side. */}
            {viewMode === 'list' && (
                <div className="hidden max-sm:block absolute top-4 right-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={clsx("text-slate-400 hover:text-brand-500", isBookmarked && "text-brand-500 fill-current")}
                        onClick={() => toggleBookmark(job.id)}
                        data-testid={`bookmark-btn-${job.id}`}
                        data-bookmarked={isBookmarked}
                    >
                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </Button>
                </div>
            )}
        </div>
    );
}
