// src/ui/components/common/SplitText.tsx
import { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
}

export const SplitText = ({
    text,
    className = '',
    delay = 0.3,
    duration = 0.8,
    stagger = 0.1
}: SplitTextProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    // Clean Architecture: Deconstrucción 3D
    const splitChars = useMemo(() => {
        return text.split('').map((char, index) => {
            return (
                <span
                    key={index}
                    // GSAP controlará estos elementos. Usamos transform-style para que vivan en un entorno 3D.
                    className="split-char inline-block whitespace-pre opacity-0 will-change-transform"
                    style={{
                        transformStyle: 'preserve-3d',
                        // Efecto de extrusión 3D (Grosor del texto) usando capas de sombra en tonos oscuros de tu marca,
                        // rematado con el brillo neón en la base.
                        textShadow: `
              0px 1px 0px #004f4e,
              0px 2px 0px #003f3e,
              0px 3px 0px #002f2e,
              0px 4px 0px #001f1e,
              0px 5px 15px rgba(123, 255, 252, 0.4),
              0px 10px 30px rgba(123, 255, 252, 0.2)
            `
                    }}
                >
                    {char}
                </span>
            );
        });
    }, [text]);

    useGSAP(() => {
        if (!containerRef.current) return;
        const chars = containerRef.current.querySelectorAll('.split-char');

        // Forzamos la perspectiva en el contenedor padre para que el 3D se vea realista
        gsap.set(containerRef.current, { perspective: 800 });

        // Estado inicial 3D de las letras: acostadas hacia atrás (rotateX) y hundidas (z)
        gsap.set(chars, {
            rotateX: -90,
            y: 40,
            z: -100,
            opacity: 0
        });

        const tl = gsap.timeline({ delay: delay });

        // 1. REVELADO 3D (Se levantan y vienen hacia el frente)
        tl.to(chars, {
            opacity: 1,
            rotateX: 0,
            y: 0,
            z: 0,
            duration: duration,
            stagger: stagger,
            ease: 'back.out(1.5)', // Rebote 3D fuerte
        });

        // 2. VIDA ORGÁNICA 3D (Flotado en los 3 ejes)
        tl.to(chars, {
            y: -5,
            rotateY: 5, // Rotación sutil en Y
            rotateX: 5, // Rotación sutil en X
            textShadow: `
        0px 2px 0px #004f4e,
        0px 4px 0px #003f3e,
        0px 6px 0px #002f2e,
        0px 8px 0px #001f1e,
        0px 10px 25px rgba(123, 255, 252, 0.7),
        0px 20px 40px rgba(123, 255, 252, 0.4)
      `, // El neón pulsa y la extrusión se estira al flotar
            duration: 2.5,
            ease: "sine.inOut",
            stagger: {
                each: 0.1,
                yoyo: true,
                repeat: -1,
            }
        }, "+=0.1");

    }, { scope: containerRef });

    return (
        <h1 ref={containerRef} className={`${className} font-sans font-bold tracking-tighter text-white z-20 relative`}>
            {splitChars}
        </h1>
    );
};