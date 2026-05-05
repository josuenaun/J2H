// src/ui/components/layout/VideoBackground.tsx
import { memo } from 'react';

interface VideoBackgroundProps {
    className?: string;
}

// Usamos memo para evitar re-renders innecesarios en el DOM
export const VideoBackground = memo(({ className = '' }: VideoBackgroundProps) => {
    return (
        <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden bg-black ${className}`}>
            {/* 
         OVERLAY (Crucial para el contraste 2026)
         Esta capa semi-transparente oscurece el video para que tu logo 3D 
         y el neón de los textos GSAP resalten sin perder legibilidad.
      */}
            <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none mix-blend-multiply" />

            {/* 
         Video Tag optimizado para Performance
         - muted & playsInline: OBLIGATORIOS para que el autoplay funcione en Safari/iOS sin bloquear la web.
      */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
            >
                <source src="/assets/hero-bg.webm" type="video/webm" />
                {/* Tu navegador M5 reproducirá WebM sin problemas, pero siempre es buena práctica dejar este espacio */}
            </video>
        </div>
    );
});

// Clean Architecture: displayName para React DevTools
VideoBackground.displayName = 'VideoBackground';