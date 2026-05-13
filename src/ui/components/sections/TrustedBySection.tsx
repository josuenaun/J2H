// src/ui/components/sections/TrustedBySection.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LogoLoop from '../common/LogoLoop';
// 🔥 Importamos los íconos específicos para cada rubro de tus clientes
import { Flame, Drumstick, UtensilsCrossed, ChefHat, Bird, Egg, Dumbbell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <UtensilsCrossed size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">POLLERÍA EXCELENCIA</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Flame size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">POLLERÍA LEÑOS</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Drumstick size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">POLLERÍA COSAMÍA</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Drumstick size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">BUNN CHICKEN</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <UtensilsCrossed size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">GRAN CHICKEN</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Flame size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">CARBÓN CHICKEN</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Flame size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">CHICKEN BRASAS</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Drumstick size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">POLLERÍA DORADITO</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <ChefHat size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">KOKU'S BURGER</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Bird size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">AVÍCOLA EL RICOTÓN</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Egg size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">AVÍCOLA BENAVIDES</span>
            </div>
        )
    },
    {
        node: (
            <div className="flex items-center gap-3 text-white/40 hover:text-[#01a2d8] transition-colors px-8">
                <Dumbbell size={28} />
                <span className="font-bebas text-3xl tracking-widest mt-1">GIMNASIO IRONBODY</span>
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
                <h2 className="trusted-anim font-bebas text-4xl md:text-5xl text-white mt-4 tracking-wide text-center">
                    CLIENTES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01a2d8] to-white/50">CONFIANZA</span>
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