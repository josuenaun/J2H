// src/ui/components/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    // 🗑️ Limpieza: El motor Lenis ahora vive en SmoothScroll.tsx, no aquí.

    return (
        <main className="relative w-full min-h-screen bg-company-dark text-company-light selection:bg-company-accent selection:text-company-dark">
            <Navbar />
            {children}
        </main>
    );
};