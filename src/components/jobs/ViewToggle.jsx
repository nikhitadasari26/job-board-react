import { Grid, List } from 'lucide-react';
import clsx from 'clsx';

export function ViewToggle({ currentMode, onToggle }) {
    return (
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
                data-testid="grid-view-btn"
                onClick={() => onToggle('grid')}
                className={clsx(
                    'p-2 rounded-md transition-all duration-200',
                    currentMode === 'grid'
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                )}
                aria-label="Grid view"
            >
                <Grid size={18} />
            </button>
            <button
                data-testid="list-view-btn"
                onClick={() => onToggle('list')}
                className={clsx(
                    'p-2 rounded-md transition-all duration-200',
                    currentMode === 'list'
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                )}
                aria-label="List view"
            >
                <List size={18} />
            </button>
        </div>
    );
}
