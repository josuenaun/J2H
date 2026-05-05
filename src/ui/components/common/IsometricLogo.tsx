// src/ui/components/common/IsometricLogo.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const IsometricLogo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!imgRef.current) return;

        // 1. REVELADO INICIAL
        gsap.from(imgRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: 'expo.out',
        });

        // 2. ANTIGRAVEDAD LITE (Levitación inofensiva)
        gsap.to(imgRef.current, {
            y: -8, // Sube 8px suavemente
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });

        // 3. NEON ORBIT (Luz deslizando por los bordes)
        gsap.to(imgRef.current, {
            keyframes: {
                "0%": { filter: "drop-shadow(-12px -12px 18px rgba(1,162,216,0.6))" },
                "25%": { filter: "drop-shadow(12px -12px 18px rgba(1,162,216,0.6))" },
                "50%": { filter: "drop-shadow(12px 12px 18px rgba(1,162,216,0.6))" },
                "75%": { filter: "drop-shadow(-12px 12px 18px rgba(1,162,216,0.6))" },
                "100%": { filter: "drop-shadow(-12px -12px 18px rgba(1,162,216,0.6))" }
            },
            duration: 5, // 5 segundos por vuelta para que sea elegante, no frenético
            repeat: -1,
            ease: "none"
        });

        // 4. PARALLAX MAGNÉTICO (Interacción con ratón - Cero lag)
        const xTo = gsap.quickTo(imgRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(imgRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const xPos = (e.clientX / innerWidth - 0.5) * 2;
            const yPos = (e.clientY / innerHeight - 0.5) * 2;

            xTo(xPos * 15);
            yTo(-yPos * 15);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative z-20 flex justify-center items-center w-full px-4 perspective-[1200px] pointer-events-none"
        >
            <img
                ref={imgRef}
                src="/assets/j2h-nexus-core.webp"
                alt="J2H Nexus Core Architecture"
                // Añadimos will-change para optimización estricta
                className="w-full max-w-[220px] md:max-w-[350px] lg:max-w-[450px] object-contain will-change-[transform,filter]"
                fetchPriority="high"
            />
        </div>
    );
};