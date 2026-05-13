// src/ui/components/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
// 🔥 1. Importa el Footer
import { Footer } from './Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="relative w-full min-h-screen bg-[#050505] text-company-light selection:bg-company-accent selection:text-company-dark flex flex-col">

            {/* FONDO GLOBAL DARK MATRIX */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[100vw] md:w-[80vw] h-[60vh] bg-[#01a2d8] opacity-[0.18] blur-[130px] rounded-[100%]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)]" />
            </div>

            <Navbar />

            {/* Contenedor del contenido principal. Le damos flex-grow para que el footer siempre quede abajo */}
            <div className="relative z-10 flex-grow">
                {children}
            </div>

            {/* 🔥 2. Añade el Footer aquí abajo del todo */}
            <Footer />
        </main>
    );
};