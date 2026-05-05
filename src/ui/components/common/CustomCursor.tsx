// src/ui/components/common/CustomCursor.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorRef.current || !followerRef.current) return;

        // Ocultamos el cursor nativo
        document.body.style.cursor = 'none';

        // 1. EL TRUCO DEFINITIVO: Forzamos el tamaño a 0 con GSAP desde el milisegundo 1
        gsap.set([cursorRef.current, followerRef.current], { scale: 0 });

        const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0, ease: 'none' });
        const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0, ease: 'none' });
        const xToFollower = gsap.quickTo(followerRef.current, 'x', { duration: 0.15, ease: 'power3.out' });
        const yToFollower = gsap.quickTo(followerRef.current, 'y', { duration: 0.15, ease: 'power3.out' });

        let isVisible = false;

        const onMouseMove = (e: MouseEvent) => {
            // 2. Cuando mueves el ratón de verdad, los círculos crecen a su tamaño normal
            if (!isVisible && (e.clientX > 5 || e.clientY > 5)) {
                gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(followerRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
                isVisible = true;
            }

            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        // 3. Efectos magnéticos (Hover)
        const onMouseEnterLink = () => {
            if (!isVisible) return; // Previene fallos si se activa antes de mover el ratón
            gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 1.5,
                backgroundColor: 'rgba(1,162,216, 0.15)',
                borderColor: '#01a2d8',
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            if (!isVisible) return;
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255, 0.3)',
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        const interactiveElements = document.querySelectorAll('a, button, .service-card-wrapper');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnterLink);
            el.addEventListener('mouseleave', onMouseLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
            document.body.style.cursor = 'auto';
        };
    }, []);

    // Se desactiva solo en celulares reales
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* Usamos scale-0 en Tailwind por doble seguridad */}
            <div
                ref={cursorRef}
                className="scale-0 fixed top-0 left-0 w-2 h-2 bg-[#01a2d8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_8px_rgba(1,162,216,1)]"
            />
            <div
                ref={followerRef}
                className="scale-0 fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform backdrop-blur-[1px]"
            />
        </>
    );
};