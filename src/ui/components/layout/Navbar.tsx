// src/ui/components/layout/Navbar.tsx
import { memo, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
// JOSHUA: Importamos los radares de React Router
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    // Inicializamos el GPS
    const location = useLocation();
    const navigate = useNavigate();

    // Bloqueamos el scroll del fondo cuando el menú móvil está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // 🔥 EFECTO MÁGICO: Si la URL tiene un # (ej: localhost:5173/#servicios)
    // este useEffect espera a que cargue la página principal y hace scroll automáticamente.
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            // Le damos 100ms a React para que dibuje el DOM antes de intentar scrollear
            setTimeout(() => {
                const targetElement = document.querySelector(location.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }, 100);
        }
    }, [location]);

    // 🔥 LA SOLUCIÓN: Controlador de Scroll Suave y Enrutamiento Inteligente
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsOpen(false);

        const isHome = location.pathname === '/';

        // 1. Si el objetivo es el inicio ("#")
        if (targetId === '#') {
            if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Si estamos en un proyecto, volvemos a la raíz
                navigate('/');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }
            return;
        }

        // 2. Si el objetivo es una sección específica (#servicios, #proyectos)
        if (isHome) {
            // Si ya estamos en el home, solo bajamos
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else {
            // Si estamos en un proyecto, ordenamos navegar al Home agregando el hash (ej: /#servicios)
            // El useEffect de arriba se encargará de hacer el scroll al llegar.
            navigate(`/${targetId}`);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/5">

                {/* Contenedor del "Logo" en Texto */}
                <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center cursor-pointer group z-50">
                    <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#01a2d8] transition-colors duration-300 drop-shadow-md">
                        Inicio
                    </span>
                </a>

                {/* Navegación de Escritorio (Oculta en móvil) */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-light text-white/70">
                    <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')} className="hover:text-[#01a2d8] transition-colors duration-300">
                        Servicios
                    </a>
                    <a href="#proyectos" onClick={(e) => handleNavClick(e, '#proyectos')} className="hover:text-[#01a2d8] transition-colors duration-300">
                        Experiencia
                    </a>
                    <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')} className="hover:text-[#01a2d8] transition-colors duration-300">
                        Contacto
                    </a>
                </nav>

                {/* Botón CTA Escritorio (AHORA CON SCROLL SUAVE) */}
                <a
                    href="#contacto"
                    onClick={(e) => handleNavClick(e, '#contacto')}
                    className="hidden md:block px-5 py-2 text-sm font-medium bg-[#01a2d8] text-black rounded-full hover:bg-white transition-colors duration-300"
                >
                    Iniciar Proyecto
                </a>

                {/* Botón Hamburguesa (Solo visible en móvil) */}
                <button
                    className="md:hidden z-50 text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </header>

            {/* OVERLAY DEL MENÚ MÓVIL */}
            <div
                className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
                    }`}
            >
                <nav className="flex flex-col items-center gap-8 text-2xl font-light text-white/80">
                    <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')} className="hover:text-[#01a2d8] transition-colors">
                        Servicios
                    </a>
                    <a href="#proyectos" onClick={(e) => handleNavClick(e, '#proyectos')} className="hover:text-[#01a2d8] transition-colors">
                        Experiencia
                    </a>
                    <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')} className="hover:text-[#01a2d8] transition-colors">
                        Contacto
                    </a>
                    {/* Botón CTA Móvil (CONVERTIDO EN ENLACE CON SCROLL SUAVE) */}
                    <a
                        href="#contacto"
                        onClick={(e) => handleNavClick(e, '#contacto')}
                        className="mt-4 px-8 py-3 text-lg font-medium text-center bg-[#01a2d8] text-black rounded-full hover:bg-white transition-colors"
                    >
                        Iniciar Proyecto
                    </a>
                </nav>
            </div>
        </>
    );
});

Navbar.displayName = 'Navbar';