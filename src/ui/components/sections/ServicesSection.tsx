// src/ui/components/sections/ServicesSection.tsx
import { useRef } from 'react';
// IMPORTANTE: Instala lucide-react si no lo tienes (npm install lucide-react)
import { ShieldCheck, Target, Lightbulb, Shuffle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { NeonServiceCard } from '../common/NeonServiceCard';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Animación del Título
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

    // 2. Aparición de las Tarjetas de Neón en Cascada
    const cards = gsap.utils.toArray('.service-card-wrapper');
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'back.out(1.2)', // Le da un pequeño rebote premium
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
      // Mantenemos el padding pt-48 para no chocar con el logo global que programamos antes
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-48 pb-32 z-0 bg-[#050505] overflow-hidden">      <div className="max-w-[1400px] mx-auto px-6 w-full z-10 relative">

        <div ref={headerRef} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Nuestros <span className="text-[#01a2d8] drop-shadow-[0_0_15px_rgba(1,162,216,0.4)]">Pilares</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            Fundamentos tecnológicos diseñados para estructurar y escalar ecosistemas de alto rendimiento.
          </p>
        </div>

        {/* 
          GRILLA RESPONSIVE
          1 columna en móviles, 2 en tablets (md), 4 en laptops grandes (lg)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          <div className="service-card-wrapper">
            <NeonServiceCard
              title="Calidad"
              description="La búsqueda de la satisfacción de las necesidades y expectativas de los clientes se constituye en nuestro argumento más importante."
              quote="La clave está en reconocer que la calidad es lo que el cliente, no la compañía, dice que es."
              icon={<Target size={24} strokeWidth={1.5} />}
            />
          </div>

          <div className="service-card-wrapper">
            <NeonServiceCard
              title="Confianza"
              description="Garantizamos un alto grado de seguridad de nuestras operaciones exitosas sobre los distintos ambientes que requieran."
              quote="La confianza no proviene de tener todas las respuestas, sino de estar abierto a todas la preguntas."
              icon={<ShieldCheck size={24} strokeWidth={1.5} />}
            />
          </div>

          <div className="service-card-wrapper">
            <NeonServiceCard
              title="Innovación"
              description="Transformamos una idea en un producto, nuevo o mejorado; en la industria o el comercio, iterativamente e incrementalmente."
              quote="No hay que pensar en cómo hacer la tarea más eficientemente sino cómo evitar tener que hacerla."
              icon={<Lightbulb size={24} strokeWidth={1.5} />}
            />
          </div>

          <div className="service-card-wrapper">
            <NeonServiceCard
              title="Flexibilidad"
              description="Relacionado al ánimo, la tolerancia, y el aceptar nuevas ideas. Una visión de futuro es necesaria en un mundo en constante cambio."
              quote="Dentro de cada revés u obstáculo descansa la semilla de una oportunidad igual o mayor."
              icon={<Shuffle size={24} strokeWidth={1.5} />}
            />
          </div>

        </div>

      </div>
    </section>
  );
};