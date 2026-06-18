import type { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

/** Shared max-width gutter wrapper used across all redesigned pages. */
const Container = ({ children, className = '' }: ContainerProps) => (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>
);

export default Container;
