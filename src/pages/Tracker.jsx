import { Navbar } from '../components/layout/Navbar';
import { JobList } from '../components/jobs/JobList';
import { useJobStore } from '../store/useJobStore';
import mockData from '../data/mock-data.json';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function Tracker() {
    const { bookmarks } = useJobStore();

    // Filter jobs that are in bookmarks
    const bookmarkedJobs = mockData.jobs.filter(job => bookmarks.includes(job.id));

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-600 mb-4 transition-colors">
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Jobs
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Application Tracker</h1>
                    <p className="text-slate-500 mt-2">
                        You have saved {bookmarkedJobs.length} jobs.
                    </p>
                </div>

                {bookmarkedJobs.length > 0 ? (
                    <JobList jobs={bookmarkedJobs} />
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                        <h3 className="text-lg font-medium text-slate-900">No saved jobs yet</h3>
                        <p className="text-slate-500 mt-2 mb-6">Start browsing to find your next opportunity.</p>
                        <Link to="/">
                            <Button>Browse Jobs</Button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
