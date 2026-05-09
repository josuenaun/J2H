// src/ui/hooks/useSmoothScroll.ts
import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
    useEffect(() => {
        // Configuración optimizada para Trackpads y Mouse Wheels modernos
        const lenis = new Lenis({
            lerp: 0.1, // Interpolación lineal (0 al 1). 0.1 es el estándar de oro para suavidad.
            wheelMultiplier: 1, // Sensibilidad de la rueda del mouse
            touchMultiplier: 2, // Multiplicador para pantallas táctiles/trackpads
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        // Variable para rastrear el ID del frame de animación
        let rafId: number;

        // Bucle de renderizado sincronizado con el refresco de tu monitor
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        // Clean Architecture: Desmontaje perfecto
        // Cancelamos el frame y destruimos la instancia para evitar fugas de memoria
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};