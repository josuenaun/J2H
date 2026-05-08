// src/ui/pages/Home.tsx
import { useEffect } from 'react';
import TextType from '../components/common/TextType';
import { VideoBackground } from '../components/layout/VideoBackground';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { GlobalFluidLogo } from '../components/common/GlobalFluidLogo';

export const Home = () => {

    // JOSHUA: Esto asegura que si haces clic en "VOLVER", 
    // regreses exactamente a la portada de arriba y no al final de la página.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* JOSHUA: El Logo Mágico ahora vive aquí adentro. 
                Así, al cambiar de página, se destruye ordenadamente y GSAP no colapsa. */}
            <GlobalFluidLogo />

            <section
                id="hero-section"
                className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden border-b border-white/5 pt-32 px-6 pb-32"
            >
                <VideoBackground className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-[1200px] mx-auto w-full h-full">
                    <div className="mt-48 md:mt-64 flex flex-col items-center w-full pointer-events-none gap-5">
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

            <ServicesSection />
            <ProjectsSection />
        </>
    );
};