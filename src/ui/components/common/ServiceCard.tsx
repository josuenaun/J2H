// src/ui/components/common/ServiceCard.tsx
import { type ReactNode, useRef, useState } from 'react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
}

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Estado para manejar la rotación en el eje X e Y
    const [transform, setTransform] = useState('');
    // Estado para suavizar la salida cuando el ratón se va
    const [isHovered, setIsHovered] = useState(false);

    // Lógica Matemática del Efecto Magnético 3D
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        // Calculamos la posición del ratón relativa a la tarjeta
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculamos el centro de la tarjeta
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculamos la rotación (Limitada a 12 grados para que se vea premium, no exagerado)
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Devolvemos la tarjeta a su posición original suavemente
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                // Solo aplicamos transición CSS cuando el ratón SALE de la tarjeta para que regrese suave.
                // Cuando está adentro, sigue al ratón instantáneamente sin lag.
                transition: isHovered ? 'none' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d'
            }}
            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-company-accent/40 will-change-transform flex flex-col items-center text-center overflow-hidden cursor-pointer"
        >
            {/* Brillo de fondo sutil (Glow) que reacciona al hover */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-company-accent/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Contenido (Empujado ligeramente hacia adelante en el eje Z para efecto Parallax interno) */}
            <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col items-center">
                <div className="text-company-accent mb-6 bg-company-accent/10 p-4 rounded-full drop-shadow-[0_0_15px_rgba(123,255,252,0.4)]">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
        </div>
    );
};