// src/ui/components/sections/TrustedBySection.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LogoLoop from '../common/LogoLoop';
import { Briefcase, Building2, Globe2, Layers, Cpu, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// JOSHUA: Aquí puedes cambiar los nombres e íconos por las imágenes reales de tus clientes luego.
// Por ahora, usé componentes de texto tipográficos y Lucide para que se vea ultra premium.
const clientLogos = [
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Building2 size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">EMPRESA ALPHA</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <MonitorPlay size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">NEXUS FITNESS</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Layers size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">TECH LOGISTICS</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Globe2 size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">GLOBAL AGRO</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Briefcase size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">GRUPO CORPORATIVO</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Cpu size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">INNOVATION LABS</span>
            </div>
        )
    }
];

export const TrustedBySection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".trusted-anim", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section
            id="clientes"
            ref={sectionRef}
            className="relative py-24 z-10 bg-transparent border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full flex flex-col items-center mb-12">
                <p className="trusted-anim text-center text-[#01a2d8] tracking-[0.3em] text-xs md:text-sm font-medium uppercase drop-shadow-md">
                    Respaldados por la industria
                </p>
                <h2 className="trusted-anim font-bebas text-4xl md:text-5xl text-white/90 mt-4 tracking-wide text-center">
                    CLIENTES DE CONFIANZA
                </h2>
            </div>

            <div className="trusted-anim w-full relative">
                <LogoLoop
                    logos={clientLogos}
                    speed={50} // Velocidad elegante y suave
                    direction="left"
                    logoHeight={50}
                    gap={20}
                    hoverSpeed={10} // Se ralentiza dramáticamente si pasan el mouse para leer
                    scaleOnHover={true}
                    fadeOut={true}
                    fadeOutColor="#050505" // Se funde perfectamente con tu Dark Matrix
                />
            </div>
        </section>
    );
};