// src/ui/components/common/HeroCube.tsx
import { motion } from 'framer-motion';

export const HeroCube = () => {
    return (
        // Contenedor que maneja el tamaño gigante que pediste
        <div className="w-full max-w-[950px] aspect-[16/9] flex items-center justify-center mb-4 z-10">

            {/* 
         Animación CONSTANTE 2026 (Flotado Y + Pulso Escala sutil)
         Joshua: Esto hace que el logo esté "vivo" siempre sin mover el ratón.
      */}
            <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{
                    // Flotado vertical suave
                    y: [0, -20, 0],
                    // Pulso de escala y rotación casi imperceptible para dar vida
                    scale: [1, 1.02, 1],
                    rotateZ: [0, 1, 0, -1, 0],
                }}
                transition={{
                    // Tiempo total del ciclo (lento para corporativo High-End)
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity, // Infinito siempre
                    repeatType: "mirror"
                }}
            >
                <img
                    src="/assets/j2h-logo.webp"
                    alt="J2H - Custom Software Development Core Visual"
                    // Mantenemos object-contain para que no se deforme
                    className="w-full h-auto object-contain max-h-[65vh] drop-shadow-[0_0_45px_rgba(123,255,252,0.25)]"
                    fetchPriority="high" // Optimización FCP
                />
            </motion.div>
        </div>
    );
};