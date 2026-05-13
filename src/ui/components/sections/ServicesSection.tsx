// src/ui/components/sections/ServicesSection.tsx
import { useRef } from 'react';
// 🔥 Importamos iconos específicos para las fases de Ingeniería SWEBOK
import { ClipboardList, Layers, Code2, ShieldCheck, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { NeonServiceCard } from '../common/NeonServiceCard';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current?.children || [], {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    const cards = gsap.utils.toArray('.service-card-wrapper');
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-48 pb-32 z-0 bg-transparent overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 w-full z-10 relative">

        <div ref={headerRef} className="mb-20 text-center">
          <p className="text-[#01a2d8] tracking-[0.3em] text-sm md:text-base font-medium mb-4 uppercase drop-shadow-md">
            Ingeniería de Software (SWEBOK)
          </p>
          <h2 className="font-bebas text-7xl md:text-8xl tracking-normal mb-4 text-center leading-[0.9] text-white">
            NUESTROS <span className="text-[#01a2d8] drop-shadow-[0_0_15px_rgba(1,162,216,0.6)]">PILARES</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mt-6">
            Aplicamos estándares internacionales para estructurar, construir y escalar ecosistemas tecnológicos de alto rendimiento.
          </p>
        </div>

        {/* 🔥 Nueva Grilla de 6 columnas para centrar 5 elementos (3 arriba, 2 centrados abajo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">

          {/* 1. Requerimientos */}
          <div className="service-card-wrapper lg:col-span-2">
            <NeonServiceCard
              title="Requerimientos"
              description="Definimos y documentamos a profundidad qué necesita el usuario o negocio y qué debe hacer el sistema para garantizar el éxito."
              quote="El primer paso hacia el éxito operativo es comprender exactamente qué problema estamos resolviendo."
              icon={<ClipboardList size={24} strokeWidth={1.5} />}
            />
          </div>

          {/* 2. Diseño */}
          <div className="service-card-wrapper lg:col-span-2">
            <NeonServiceCard
              title="Diseño"
              description="Planificamos cómo estará estructurado el software: arquitectura, componentes, interfaces y modelado de datos."
              quote="Una buena arquitectura es el lienzo de ingeniería sobre el cual se construyen sistemas duraderos."
              icon={<Layers size={24} strokeWidth={1.5} />}
            />
          </div>

          {/* 3. Construcción */}
          <div className="service-card-wrapper md:col-span-2 lg:col-span-2">
            <NeonServiceCard
              title="Construcción"
              description="Desarrollo del software mediante programación estructurada, integración continua y creación del código fuente."
              quote="El código limpio y optimizado no es un lujo, es la base innegociable de un ecosistema escalable."
              icon={<Code2 size={24} strokeWidth={1.5} />}
            />
          </div>

          {/* 4. Pruebas (Centrado abajo en Desktop) */}
          <div className="service-card-wrapper lg:col-start-2 lg:col-span-2">
            <NeonServiceCard
              title="Pruebas"
              description="Verificamos y validamos mediante entornos controlados que el software funcione correctamente y cumpla los requerimientos."
              quote="La calidad no se inyecta al final del ciclo, se garantiza y estresa en cada paso del proceso."
              icon={<ShieldCheck size={24} strokeWidth={1.5} />}
            />
          </div>

          {/* 5. Mantenimiento (Centrado abajo en Desktop) */}
          <div className="service-card-wrapper lg:col-span-2">
            <NeonServiceCard
              title="Mantenimiento"
              description="Modificamos y mejoramos el software después de su entrega para corregir errores, adaptarlo a nuevos entornos o agregar mejoras."
              quote="El software vivo evoluciona. La adaptabilidad técnica es nuestra garantía para el futuro."
              icon={<Settings size={24} strokeWidth={1.5} />}
            />
          </div>

        </div>

      </div>
    </section>
  );
};