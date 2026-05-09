// src/ui/components/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="relative w-full min-h-screen bg-[#050505] text-company-light selection:bg-company-accent selection:text-company-dark">

            {/* 🔥 FONDO GLOBAL DARK MATRIX (EQUILIBRADO) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* 1. Resplandor radial: Opacidad intermedia (0.18) y altura controlada (60vh) */}
                <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[100vw] md:w-[80vw] h-[60vh] bg-[#01a2d8] opacity-[0.18] blur-[130px] rounded-[100%]" />

                {/* 2. Patrón de cuadrícula: Líneas sutiles (#ffffff08) que acompañan sin molestar */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)]" />
            </div>

            <Navbar />

            <div className="relative z-10">
                {children}
            </div>
        </main>
    );
};