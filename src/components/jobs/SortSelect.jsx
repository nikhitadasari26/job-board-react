import { ChevronDown } from 'lucide-react';

export function SortSelect({ value, onChange }) {
    return (
        <div className="relative">
            <select
                data-testid="sort-salary-desc" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm cursor-pointer hover:border-brand-400 transition-colors"
            >
                <option value="relevance">Relevance</option>
                <option value="date">Newest First</option>
                <option value="salary-desc">Salary (High to Low)</option>
                <option value="salary-asc">Salary (Low to High)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
    );
}
