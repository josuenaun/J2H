// src/ui/components/layout/SmoothScroll.tsx
import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08, // El "estándar de oro" que tú mismo configuraste
                duration: 1.2,
                smoothWheel: true,
                // syncTouch: true, // Descomenta esto si quieres que el scroll en móvil sea igual de denso
            }}
        >
            {children}
        </ReactLenis>
    );
};