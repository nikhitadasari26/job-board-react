import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8" data-testid="pagination-controls">
            <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} className="mr-1" />
                Previous
            </Button>

            <span className="text-sm font-medium text-slate-600">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="secondary"
                size="sm"
                data-testid="pagination-next"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <ChevronRight size={16} className="ml-1" />
            </Button>
        </div>
    );
}
