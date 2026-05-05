// src/App.tsx
import { MainLayout } from './ui/components/layout/MainLayout';
import TextType from './ui/components/common/TextType';
import { VideoBackground } from './ui/components/layout/VideoBackground';
import { SmoothScroll } from './ui/components/layout/SmoothScroll';
import { ServicesSection } from './ui/components/sections/ServicesSection';
import { CustomCursor } from './ui/components/common/CustomCursor';
// IMPORTAMOS EL NUEVO LOGO GLOBAL
import { GlobalFluidLogo } from './ui/components/common/GlobalFluidLogo';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />

      {/* 1. EL LOGO FLOTANTE GLOBAL */}
      {/* Vive fuera de las secciones para poder viajar libremente */}
      <GlobalFluidLogo />

      <MainLayout>
        {/* 
            2. LA PORTADA (Añadimos id="hero-section") 
            Este ID es el gatillo que GSAP usa para mover el logo.
        */}
        <section
          id="hero-section"
          className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden border-b border-white/5 pt-32 px-6 pb-32"
        >
          <VideoBackground className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-[1200px] mx-auto w-full h-full">

            {/* 
               Ya no está el logo aquí. Dejamos un espacio vacío (mt-40 o margin) 
               para que el logo global flote exactamente en este hueco.
            */}
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

        {/* 3. SECCIÓN INFERIOR */}
        {/* Al hacer scroll aquí, el logo ya estará alojado en el Navbar */}
        <ServicesSection />
      </MainLayout>
    </SmoothScroll>
  );
}

export default App;