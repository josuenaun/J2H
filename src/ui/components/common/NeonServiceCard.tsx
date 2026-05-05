// src/ui/components/common/NeonServiceCard.tsx
import type { ReactNode } from 'react';

interface NeonServiceCardProps {
    title: string;
    description: string;
    quote: string;
    icon: ReactNode;
}

export const NeonServiceCard = ({ title, description, quote, icon }: NeonServiceCardProps) => {
    return (
        <div className="relative h-full p-[1px] rounded-2xl overflow-hidden group will-change-transform">

            {/* 
        GRADIENTE GIRATORIO
        Por defecto (Móvil): opacity-40
        En Escritorio (md): al hacer hover sube a opacity-100 (md:group-hover:opacity-100)
      */}
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#01a2d8_50%,#000000_100%)] opacity-40 md:group-hover:opacity-100 transition-opacity duration-500" />

            {/* 
        CUERPO DE LA TARJETA
        En móvil se queda en bg-black/90 siempre para evitar el "sticky hover" al tocar.
      */}
            <div className="relative bg-black/90 backdrop-blur-xl h-full w-full rounded-2xl p-6 md:p-8 flex flex-col justify-between z-10 transition-colors duration-500 md:group-hover:bg-black/70">

                <div>
                    {/* ICONO */}
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#01a2d8]/10 text-[#01a2d8] border border-[#01a2d8]/30 shadow-[0_0_15px_rgba(1,162,216,0.2)] md:group-hover:shadow-[0_0_25px_rgba(1,162,216,0.5)] transition-all duration-300">
                        {icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                        {title}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* QUOTE BOX (La explicación pequeña) */}
                <div className="mt-8 p-4 rounded-r-lg bg-[#01a2d8]/5 border border-[#01a2d8]/10 relative overflow-hidden md:group-hover:bg-[#01a2d8]/10 transition-colors duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#01a2d8] shadow-[0_0_8px_#01a2d8]"></div>
                    <p className="text-xs text-[#01a2d8] italic font-light tracking-wide leading-relaxed">
                        "{quote}"
                    </p>
                </div>

            </div>
        </div>
    );
};