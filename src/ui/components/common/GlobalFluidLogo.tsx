// src/ui/components/common/GlobalFluidLogo.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const GlobalFluidLogo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imgRef.current) return;

        // 1. ANIMACIÓN DE ENTRADA GLOBAL
        gsap.from(containerRef.current, {
            y: 40,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
        });

        // 2. MAGIA RESPONSIVE CON MATCHMEDIA
        let mm = gsap.matchMedia();

        mm.add({
            // Definimos los Breakpoints
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            // @ts-ignore - Tipado dinámico de GSAP
            let { isDesktop, isMobile } = context.conditions;

            // Animación de Scroll adaptada al dispositivo
            gsap.to(imgRef.current, {
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },

                // Subimos el logo en la sección de Servicios
                top: isDesktop ? "10vh" : "35vh",

                left: "100vw",
                xPercent: isDesktop ? -20 : -10,
                yPercent: -50,
                width: isDesktop ? "250px" : "240px",
                opacity: isDesktop ? 0.04 : 0.06,
                rotate: 15,
                ease: "none"
            });
        });

        // 3. PARALLAX MAGNÉTICO
        let mmParallax = gsap.matchMedia();
        mmParallax.add("(min-width: 768px)", () => {
            const xTo = gsap.quickTo(imgRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
            const yTo = gsap.quickTo(imgRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });

            const handleMouseMove = (e: MouseEvent) => {
                const { innerWidth, innerHeight } = window;
                const xPos = (e.clientX / innerWidth - 0.5) * 2;
                const yPos = (e.clientY / innerHeight - 0.5) * 2;
                xTo(xPos * 15);
                yTo(-yPos * 15);
            };

            const handleMouseLeave = () => { xTo(0); yTo(0); };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            // JOSHUA: CORRECCIÓN AQUÍ
            // Subimos a z-[10]. Así estará por encima del fondo oscuro de la web, 
            // pero por debajo de las tarjetas (que estarán en capas superiores).
            className="fixed inset-0 z-[10] pointer-events-none perspective-[1200px]"
        >
            <img
                ref={imgRef}
                src="/assets/j2h-nexus-core.webp"
                alt="J2H Nexus Core Architecture"
                className="absolute top-[25%] lg:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] lg:w-[450px] object-contain mix-blend-screen will-change-[transform,width,top,left,opacity]"
                fetchPriority="high"
            />
        </div>
    );
};