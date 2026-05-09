// src/ui/pages/Home.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import TextType from '../components/common/TextType';
import { VideoBackground } from '../components/layout/VideoBackground';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { GlobalFluidLogo } from '../components/common/GlobalFluidLogo';
import { ContactSection } from '../components/sections/ContactSection';
import { TrustedBySection } from '../components/sections/TrustedBySection';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
    // JOSHUA: Referencia para el contenedor que vamos a "quebrar"
    const shatterContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        gsap.to(shatterContainerRef.current, {
            scrollTrigger: {
                trigger: "#hero-section",
                // JOSHUA: Cambiamos el start. Ahora la animación arranca INMEDIATAMENTE
                // cuando haces un mínimo scroll hacia abajo.
                start: "top top",
                // JOSHUA: Y termina mucho antes (al 25% de la pantalla en lugar de al centro)
                end: "25% top",
                scrub: 1,
            },
            y: 150,
            rotationZ: -12,
            rotationX: 60,
            scale: 0.8,
            opacity: 0,
            ease: "power3.in"
        });
    }, []);

    return (
        <>
            {/* JOSHUA: El logo vuelve a estar libre sin envoltorios que lo tapen */}
            <GlobalFluidLogo />

            <section
                id="hero-section"
                // Agregamos perspective-[1200px] para que la caída hacia atrás en 3D (rotationX) se vea realista
                className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden border-b border-white/5 pt-32 px-6 pb-32 perspective-[1200px]"
            >
                <VideoBackground className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-[1200px] mx-auto w-full h-full">

                    {/* Contenedor que recibirá el impacto */}
                    <div
                        ref={shatterContainerRef}
                        className="mt-48 md:mt-64 flex flex-col items-center w-full pointer-events-none gap-5 will-change-transform origin-bottom"
                    >
                        <p className="text-white/40 text-xs md:text-sm tracking-[0.4em] font-light uppercase">
                            Software a tu medida
                        </p>
                        <div className="bg-black/30 backdrop-blur-sm px-8 py-3 rounded-full pointer-events-auto border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <TextType
                                text="Consultoría y Desarrollo de Software"
                                className="text-sm md:text-lg font-sans font-medium tracking-[0.25em] uppercase text-white/90"
                                typingSpeed={60}
                                deletingSpeed={40}
                                pauseDuration={2500}
                                showCursor={true}
                                cursorCharacter="_"
                                cursorClassName="text-[#01a2d8] drop-shadow-[0_0_8px_rgba(1,162,216,0.8)]"
                                initialDelay={1500}
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* JOSHUA: Estas secciones ya no tienen el div relative encima, por lo que el logo bajará sobre ellas sin problemas */}
            <ServicesSection />
            <ProjectsSection />
            <TrustedBySection />
            <ContactSection />
        </>
    );
};