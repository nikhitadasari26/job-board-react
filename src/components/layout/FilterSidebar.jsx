import { Search, MapPin, X } from 'lucide-react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useJobStore } from '../../store/useJobStore';
import { Button } from '../ui/Button';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';

const SKILL_OPTIONS = [
    { value: 'React', label: 'React' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Docker', label: 'Docker' },
    { value: 'AWS', label: 'AWS' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'Tailwind', label: 'Tailwind' },
].sort((a, b) => a.label.localeCompare(b.label));

const JOB_TYPES = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCE_LEVELS = ['Internship', 'Junior', 'Mid', 'Senior'];

export function FilterSidebar({ className }) {
    const { filters, setFilter, clearFilters } = useJobStore();

    const [localSearch, setLocalSearch] = useState(filters.search);
    const debouncedSearch = useDebounce(localSearch, 300);

    useEffect(() => {
        setFilter('search', debouncedSearch);
    }, [debouncedSearch, setFilter]);

    useEffect(() => {
        if (filters.search === '') setLocalSearch('');
    }, [filters.search]);


    const handleSkillChange = (selectedOptions) => {
        setFilter('skills', selectedOptions ? selectedOptions.map(opt => opt.value) : []);
    };

    const handleCheckboxChange = (category, value) => {
        const current = filters[category];
        const next = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        setFilter(category, next);
    };

    return (
        <div className={`space-y-8 ${className}`}>

            {/* Search */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Search</h3>
                    {/* Badge count could go here */}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        data-testid="search-input"
                        placeholder="Job title or company..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters Container */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="clear-filters-btn" className="text-xs text-brand-600 hover:text-brand-800 px-2 h-auto">
                        Clear all
                    </Button>
                </div>

                {/* Job Type */}
                <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Job Type</h4>
                    <div className="space-y-2">
                        {JOB_TYPES.map(type => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    data-testid={`filter-job-type-${type.toLowerCase()}`}
                                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 transition-all"
                                    checked={filters.jobType.includes(type)}
                                    onChange={() => handleCheckboxChange('jobType', type)}
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Experience Level */}
                <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Experience Level</h4>
                    <div className="space-y-2">
                        {EXPERIENCE_LEVELS.map(level => (
                            <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    data-testid={`filter-exp-${level.toLowerCase()}`}
                                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 transition-all"
                                    checked={filters.experienceLevel.includes(level)}
                                    onChange={() => handleCheckboxChange('experienceLevel', level)}
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Skills - Multi-select */}
                <div data-testid="filter-skills">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Skills</h4>
                    <Select
                        isMulti
                        options={SKILL_OPTIONS}
                        value={SKILL_OPTIONS.filter(opt => filters.skills.includes(opt.value))}
                        onChange={handleSkillChange}
                        className="text-sm"
                        classNames={{
                            control: ({ isFocused }) =>
                                `!border-slate-300 !rounded-lg !shadow-none hover:!border-brand-400 ${isFocused ? '!border-brand-500 !ring-1 !ring-brand-500' : ''}`,
                            option: ({ isFocused, isSelected }) =>
                                `!cursor-pointer ${isSelected ? '!bg-brand-500' : isFocused ? '!bg-brand-50 !text-brand-900' : ''}`,
                            multiValue: () => '!bg-brand-50 !rounded-md',
                            multiValueLabel: () => '!text-brand-700 !font-medium',
                            multiValueRemove: () => '!text-brand-500 hover:!bg-brand-100 hover:!text-brand-700 !rounded-r-md',
                        }}
                    />
                </div>

                <hr className="border-slate-100" />

                {/* Salary Slider */}
                <div data-testid="filter-salary-slider">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium text-slate-700">Salary Range</h4>
                        <span className="text-xs text-slate-500 font-medium">
                            ${(filters.salaryRange[0] / 1000).toFixed(0)}k - ${(filters.salaryRange[1] / 1000).toFixed(0)}k
                        </span>
                    </div>
                    <div className="px-2">
                        <Slider
                            range
                            min={0}
                            max={300000}
                            step={5000}
                            value={filters.salaryRange}
                            onChange={(val) => setFilter('salaryRange', val)}
                            trackStyle={[{ backgroundColor: '#0ea5e9' }]}
                            handleStyle={[
                                { borderColor: '#0ea5e9', backgroundColor: '#fff', opacity: 1 },
                                { borderColor: '#0ea5e9', backgroundColor: '#fff', opacity: 1 },
                            ]}
                            railStyle={{ backgroundColor: '#e2e8f0' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
