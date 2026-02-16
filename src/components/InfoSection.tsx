import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface InfoSectionProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    id?: string;
    className?: string; // Add className prop for flexibility
}

export function InfoSection({ title, icon, children, id, className }: InfoSectionProps) {
    return (
        <div id={id} className={cn("py-8 md:py-10", className)}>
            <div className="flex items-center gap-3 mb-6">
                {icon && <div className="text-red-600">{icon}</div>}
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="text-white/70 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
