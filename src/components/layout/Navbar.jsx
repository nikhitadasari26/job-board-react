import { Briefcase, Bookmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                        <Briefcase size={20} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">JobHunt</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant={location.pathname === '/' ? 'secondary' : 'ghost'} size="sm">
                            Find Jobs
                        </Button>
                    </Link>
                    <Link to="/tracker">
                        <Button variant={location.pathname === '/tracker' ? 'secondary' : 'ghost'} size="sm">
                            <Bookmark size={16} className="mr-2" />
                            Saved Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
