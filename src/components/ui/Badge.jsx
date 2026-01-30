import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, className, variant = 'default', ...props }) {
    const variants = {
        default: 'bg-slate-100 text-slate-800',
        primary: 'bg-brand-100 text-brand-800',
        outline: 'border border-slate-200 text-slate-600',
        success: 'bg-green-100 text-green-800',
    };

    return (
        <span
            className={twMerge(
                clsx(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    variants[variant],
                    className
                )
            )}
            {...props}
        >
            {children}
        </span>
    );
}
