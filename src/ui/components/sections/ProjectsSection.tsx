// src/ui/components/sections/ProjectsSection.tsx
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Monitor, Smartphone, Server, Users, CalendarClock, PenTool, ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "gymsoftware",
        title: "GYMSOFTWARE",
        description: "Plataforma SaaS multi-tenant diseñada para escalar operaciones de cadenas fitness. Implementa una arquitectura robusta que gestiona miles de membresías activas, procesa pagos recurrentes automatizados mediante pasarelas seguras y ofrece un dashboard analítico en tiempo real. La infraestructura en la nube garantiza cero caídas durante las horas pico de acceso a los establecimientos, sincronizando molinetes de entrada con la base de datos principal.",
        tech: ["React", ".NET C#", "Tailwind"],
        icon: <Monitor size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        id: "allfood",
        title: "ALLFOOD",
        description: "Ecosistema integral de delivery y logística de última milla optimizado para operaciones de alto volumen en grandes cadenas de pollerías. Cuenta con seguimiento de flotas por geolocalización en tiempo real, enrutamiento inteligente para repartidores y un motor de pedidos capaz de soportar picos masivos de concurrencia los fines de semana. La sincronización de estados asegura una experiencia perfecta y sin fricciones entre la cocina y el cliente final.",
        tech: ["Swift", "React Native", "Firebase"],
        icon: <Smartphone size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        id: "imeat",
        title: "IMEAT",
        description: "Sistema ERP de grado industrial construido para transformar digitalmente el sector avícola. El núcleo del software asegura una trazabilidad milimétrica desde la planta de procesamiento hasta el distribuidor, integrando captura de datos directa desde balanzas electrónicas mediante protocolos IoT. Optimiza el control de mermas, la gestión de almacenes frigoríficos y automatiza las proyecciones de stock con un motor de base de datos de alta disponibilidad.",
        tech: ["Vite", "C# .NET", "SQL Server"],
        icon: <Server size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        id: "sistema-asistencias",
        title: "SISTEMA DE ASISTENCIAS",
        description: "Solución empresarial para la gestión de capital humano con un enfoque crítico en la seguridad e inmutabilidad de los datos. El sistema procesa miles de registros diarios mediante integración directa con hardware biométrico avanzado, aplicando reglas de negocio complejas para calcular automáticamente horas extras, tardanzas y penalidades. Incluye un generador de reportes dinámicos que agiliza exponencialmente el flujo de nóminas del departamento de RRHH.",
        tech: ["React", "Node.js", "PostgreSQL"],
        icon: <Users size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        id: "owl-schedule",
        title: "OWL SCHEDULE",
        description: "Motor de planificación inteligente que resuelve el complejo desafío logístico de los horarios corporativos. Utiliza algoritmos de prevención de colisiones para asignar turnos de manera equitativa, considerando restricciones legales, vacaciones y disponibilidad del personal. Su interfaz gráfica permite a los gerentes arrastrar y soltar turnos en tiempo real, validando la cobertura de áreas críticas y alertando sobre posibles cuellos de botella operativos.",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        icon: <CalendarClock size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    },
    {
        id: "drawiu",
        title: "DRAWIU",
        description: "Aplicación web de vanguardia orientada a la comunidad creativa. Basada en un motor gráfico Canvas optimizado, permite el dibujo digital fluido y sin latencia directamente en el navegador. Incorpora un ecosistema de colaboración en tiempo real, donde múltiples usuarios pueden bosquejar simultáneamente, mientras un gestor de estados global maneja de manera inmaculada la complejidad de las capas vectoriales, historiales de acciones y herramientas de diseño.",
        tech: ["React", "Canvas API", "Zustand"],
        icon: <PenTool size={32} className="text-[#01a2d8]" strokeWidth={1.5} />
    }
];

export const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const cards = gsap.utils.toArray('.project-card');

        cards.forEach((card: any) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }, { scope: sectionRef });

    const handleProjectClick = (projectId: string) => {
        navigate(`/proyecto/${projectId}`);
    };

    return (
        <section
            id="proyectos"
            ref={sectionRef}
            className="relative bg-[#050505] text-white border-t border-white/5"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row relative">

                {/* COLUMNA IZQUIERDA (FIJA) */}
                <div className="w-full md:w-[40%] md:sticky md:top-0 h-[40vh] md:h-screen flex flex-col justify-start z-20 pt-16 md:pt-32">
                    <h2 className="font-bebas text-7xl md:text-8xl tracking-normal mb-4 text-left leading-[0.9]">
                        NUESTRA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01a2d8] to-white/50">
                            EXPERIENCIA
                        </span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-sm text-left mt-2">
                        Arquitecturas escalables y soluciones a medida que impulsan el éxito operativo de nuestros clientes.
                    </p>
                </div>

                {/* COLUMNA DERECHA (SCROLL VERTICAL) */}
                <div className="w-full md:w-[60%] flex flex-col gap-8 md:gap-12 py-10 md:py-32 z-10">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="project-card relative w-full bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col overflow-hidden backdrop-blur-sm transition-colors duration-500 hover:bg-black/80 shadow-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#01a2d8]/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none hover:opacity-100" />

                            <div>
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(1,162,216,0.1)]">
                                    {project.icon}
                                </div>
                                <h3 className="font-bebas text-4xl md:text-5xl mb-3 tracking-wide text-white/90 leading-none mt-4">
                                    {project.title}
                                </h3>
                                <p className="text-white/60 leading-[1.8] text-base md:text-[1.05rem] mb-8 font-light tracking-wide text-justify md:text-left relative z-10">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex justify-between items-end relative z-10 mt-auto pt-6 border-t border-white/5">

                                <div className="flex flex-wrap gap-2 md:gap-3 max-w-[70%]">
                                    {project.tech.map((techItem, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs md:text-sm font-medium px-4 py-1.5 rounded-full bg-[#01a2d8]/10 text-[#01a2d8] border border-[#01a2d8]/20 tracking-wider uppercase"
                                        >
                                            {techItem}
                                        </span>
                                    ))}
                                </div>

                                {/* JOSHUA: CORRECCIÓN DE PRECISIÓN DE CLIC */}
                                {/* Ahora el contenedor principal es un simple div inerte */}
                                <div className="flex flex-row-reverse items-center p-1">

                                    {/* 1. LA FLECHA ES EL ÚNICO BOTÓN. El onClick y el cursor-pointer solo viven aquí */}
                                    <button
                                        onClick={() => handleProjectClick(project.id)}
                                        className="peer w-10 h-10 rounded-full border border-white flex items-center justify-center bg-transparent transition-all duration-300 hover:scale-110 hover:bg-[#01a2d8] hover:border-[#01a2d8] cursor-pointer"
                                        aria-label={`Ver caso de estudio de ${project.title}`}
                                    >
                                        <ArrowDownRight className="text-white w-5 h-5" strokeWidth={2} />
                                    </button>

                                    {/* 2. EL TEXTO ES DECORATIVO. Le añadí cursor-default para que el mouse no parezca una "manito" de clic al pasar por encima */}
                                    <span className="font-bebas text-xl tracking-wider text-white overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-[100px] mr-3 peer-hover:max-w-0 peer-hover:mr-0 peer-hover:opacity-0 cursor-default select-none">
                                        CLICK ME
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};