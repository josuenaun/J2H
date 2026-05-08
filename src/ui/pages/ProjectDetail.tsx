// src/ui/components/pages/ProjectDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export const ProjectDetail = () => {
    // Extraemos el ID del proyecto de la URL (ej: "gymsoftware")
    const { id } = useParams();
    const navigate = useNavigate();

    // Nos aseguramos de que al entrar a la página, el scroll esté arriba del todo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 lg:px-8 max-w-[1400px] mx-auto relative z-20">

            {/* BOTÓN DE REGRESO */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white/50 hover:text-[#01a2d8] transition-colors mb-12 group cursor-pointer"
            >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                <span className="font-bebas text-xl tracking-wider pt-1">VOLVER</span>
            </button>

            {/* TÍTULO DINÁMICO */}
            <h1 className="font-bebas text-6xl md:text-8xl text-white mb-6 uppercase leading-none">
                CASO DE ESTUDIO: <br />
                <span className="text-[#01a2d8] drop-shadow-[0_0_15px_rgba(1,162,216,0.4)]">{id}</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light">
                Bienvenido a la arquitectura de {id}. Aquí detallaremos el problema, la solución técnica y los resultados obtenidos.
            </p>

            {/* MOCKUP DEL CONTENIDO (Lo diseñaremos más adelante) */}
            <div className="mt-20 w-full h-[50vh] border border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
                <span className="font-bebas text-3xl text-white/20 tracking-widest">PRÓXIMAMENTE: DISEÑO PREMIUM</span>
            </div>
        </div>
    );
};