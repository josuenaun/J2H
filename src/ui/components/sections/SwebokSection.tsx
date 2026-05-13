// src/ui/components/sections/SwebokSection.tsx
import { useRef } from 'react';
import { ClipboardList, PenTool, Code2, ShieldCheck, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SWEBOK_PHASES = [
    {
        title: "Requerimientos",
        description: "Definir y documentar qué necesita el usuario o negocio y qué debe hacer el sistema.",
        icon: <ClipboardList size={24} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        title: "Diseño",
        description: "Planificar cómo estará estructurado el software: arquitectura, componentes, interfaces y datos.",
        icon: <PenTool size={24} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        title: "Construcción",
        description: "Desarrollo del software mediante programación, integración y creación del código fuente.",
        icon: <Code2 size={24} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        title: "Pruebas",
        description: "Verificar y validar que el software funcione correctamente y cumpla los requerimientos.",
        icon: <ShieldCheck size={24} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        title: "Mantenimiento",
        description: "Modificar y mejorar el software después de su entrega para corregir errores, adaptarlo o agregar mejoras.",
        icon: <Settings size={24} className="text-[#01a2d8]" strokeWidth={1.5} />
    }
];

export const SwebokSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const elements = gsap.utils.toArray('.swebok-item');

        gsap.from(".swebok-title", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(elements, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Animación de la línea conectora
        gsap.from(".swebok-line", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            height: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });

    }, { scope: sectionRef });

    return (
        <section
            id="metodologia"
            ref={sectionRef}
            className="relative py-32 z-10 bg-transparent border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-[1000px] mx-auto px-6 lg:px-8 w-full relative z-10">

                {/* Cabecera */}
                <div className="swebok-title mb-20 text-center md:text-left">
                    <p className="text-[#01a2d8] tracking-[0.3em] text-sm md:text-base font-medium mb-4 uppercase drop-shadow-md">
                        Metodología Estándar
                    </p>
                    <h2 className="font-bebas text-5xl md:text-7xl tracking-normal mb-4 leading-[0.9] text-white">
                        INGENIERÍA DE SOFTWARE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01a2d8] to-white/50">
                            SWEBOK
                        </span>
                    </h2>
                </div>

                {/* Timeline Layout */}
                <div className="relative pl-8 md:pl-16">
                    {/* Línea vertical conectora */}
                    <div className="swebok-line absolute top-0 left-[19px] md:left-[35px] w-[2px] h-full bg-gradient-to-b from-[#01a2d8] via-[#01a2d8]/20 to-transparent" />

                    <div className="flex flex-col gap-12">
                        {SWEBOK_PHASES.map((phase, index) => (
                            <div key={index} className="swebok-item relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

                                {/* Icono circular (Punto del Timeline) */}
                                <div className="absolute -left-[35px] md:-left-[51px] top-1 md:top-auto w-10 h-10 rounded-full bg-[#050505] border-2 border-[#01a2d8] flex items-center justify-center shadow-[0_0_15px_rgba(1,162,216,0.3)] z-10">
                                    <div className="scale-75">
                                        {phase.icon}
                                    </div>
                                </div>

                                {/* Tarjeta de contenido */}
                                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors w-full group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-white group-hover:text-[#01a2d8] transition-colors">
                                            {phase.title}
                                        </h3>
                                        <span className="font-bebas text-2xl text-white/10">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <p className="text-white/60 font-light text-base leading-relaxed max-w-2xl">
                                        {phase.description}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};