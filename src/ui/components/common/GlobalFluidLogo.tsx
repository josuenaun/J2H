// src/ui/components/common/GlobalFluidLogo.tsx
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import logoJ2H from '../../../assets/j2h-nexus-core.png'

gsap.registerPlugin(ScrollTrigger);

export const GlobalFluidLogo = () => {
    // JOSHUA: 1. Agregamos 'clients' a la lista de secciones
    const [activeSection, setActiveSection] = useState<'hero' | 'services' | 'projects' | 'clients' | 'contact'>('hero');
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        // RADAR SERVICIOS
        ScrollTrigger.create({
            trigger: "#servicios",
            start: "top 35%",
            onEnter: () => setActiveSection('services'),
            onLeaveBack: () => setActiveSection('hero'),
        });

        // RADAR PROYECTOS
        ScrollTrigger.create({
            trigger: "#proyectos",
            start: "top 70%",
            onEnter: () => setActiveSection('projects'),
            onLeaveBack: () => setActiveSection('services'),
        });

        // JOSHUA: 2. NUEVO RADAR PARA CLIENTES
        ScrollTrigger.create({
            trigger: "#clientes",
            start: "top 72%", // Se esconde apenas asoma el carrusel
            onEnter: () => setActiveSection('clients'),
            onLeaveBack: () => setActiveSection('projects'),
        });

        // RADAR CONTACTO
        ScrollTrigger.create({
            trigger: "#contacto",
            start: "top 80%",
            onEnter: () => setActiveSection('contact'),
            // Ahora si subes desde contacto, regresas a clientes
            onLeaveBack: () => setActiveSection('clients'),
        });

        // PARALLAX MAGNÉTICO
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

    }, []);

    const getLogoStateClasses = () => {
        switch (activeSection) {
            case 'hero':
                return "top-[25vh] md:top-[28vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] lg:w-[450px] opacity-100 rotate-0";

            case 'services':
                return "top-[15vh] md:top-[20vh] left-[75vw] md:left-[85vw] -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] opacity-[0.10] md:opacity-[0.06] rotate-12";

            case 'projects':
                return "top-[65vh] md:top-[65vh] left-[50vw] md:left-[20vw] -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] opacity-100 rotate-0";

            // JOSHUA: 3. Unificamos la animación. 
            // Si estás en clientes O en contacto, el logo se vuelve un fantasma.
            case 'clients':
            case 'contact':
                return "top-[15vh] md:top-[15vh] left-[15vw] md:left-[15vw] -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[250px] opacity-[0.03] -rotate-12";

            default:
                return "top-[28vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 w-[450px] opacity-100 rotate-0";
        }
    };

    return (
        <div className="fixed inset-0 z-[10] pointer-events-none perspective-[1200px]">
            <div
                className={`absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-screen will-change-[transform,width,top,left,opacity] ${getLogoStateClasses()}`}
            >
                <img
                    ref={imgRef}
                    src={logoJ2H}
                    alt="J2H Nexus Core Architecture"
                    fetchPriority="high"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};