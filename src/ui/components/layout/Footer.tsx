// src/ui/components/layout/Footer.tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// 🔥 Solo importamos Mail, que es un ícono nativo y seguro.
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".footer-anim", {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: footerRef });

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#020202] border-t border-white/5 pt-20 pb-10 overflow-hidden z-20"
        >
            {/* Brillo superior sutil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[1px] bg-gradient-to-r from-transparent via-[#01a2d8]/50 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30vw] h-[100px] bg-[#01a2d8] opacity-[0.03] blur-[50px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* COLUMNA 1: Marca */}
                    <div className="col-span-1 md:col-span-5 footer-anim">
                        <h2 className="font-bebas text-4xl tracking-widest text-white mb-4">
                            J2H <span className="text-[#01a2d8]">SOFTWARE</span>
                        </h2>
                        <p className="text-white/50 text-sm md:text-base max-w-sm mb-8 font-light leading-relaxed">
                            Arquitecturas escalables y soluciones a medida que impulsan el éxito operativo de ecosistemas de alto rendimiento.
                        </p>
                        <div className="flex gap-4">

                            {/* SVGs PUROS PARA REDES SOCIALES */}

                            {/* LINKEDIN */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#01a2d8] hover:bg-[#01a2d8]/10 hover:border-[#01a2d8]/30 transition-all" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>

                            {/* GITHUB */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#01a2d8] hover:bg-[#01a2d8]/10 hover:border-[#01a2d8]/30 transition-all" aria-label="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </a>

                            {/* TWITTER / X */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#01a2d8] hover:bg-[#01a2d8]/10 hover:border-[#01a2d8]/30 transition-all" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                            </a>

                        </div>
                    </div>

                    {/* COLUMNA 2: Enlaces Rápidos */}
                    <div className="col-span-1 md:col-span-3 md:col-start-7 footer-anim">
                        <h3 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Navegación</h3>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#hero-section" className="text-white/50 hover:text-[#01a2d8] transition-colors text-sm">Inicio</a></li>
                            <li><a href="#servicios" className="text-white/50 hover:text-[#01a2d8] transition-colors text-sm">Nuestros Pilares</a></li>
                            <li><a href="#proyectos" className="text-white/50 hover:text-[#01a2d8] transition-colors text-sm">Experiencia</a></li>
                            <li><a href="#contacto" className="text-white/50 hover:text-[#01a2d8] transition-colors text-sm">Contacto</a></li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: Contacto Legal */}
                    <div className="col-span-1 md:col-span-3 footer-anim">
                        <h3 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Contacto</h3>
                        <ul className="flex flex-col gap-4">
                            {/* 🔥 EMAIL ACTUALIZADO */}
                            <li className="flex items-start gap-3 text-white/50 text-sm">
                                <Mail size={16} className="mt-0.5 text-[#01a2d8]" />
                                <a href="mailto:contacto@j2hsoft.com" className="hover:text-white transition-colors">jesus.naun@j2hsoft.com</a>
                            </li>
                            {/* 🔥 TELÉFONO AÑADIDO AL FOOTER */}
                            <li className="flex items-start gap-3 text-white/50 text-sm">
                                <span className="text-[#01a2d8] font-bold mt-0.5 text-xs border border-[#01a2d8]/30 px-1.5 py-0.5 rounded bg-[#01a2d8]/10">TEL</span>
                                <a href="tel:+51946215658" className="hover:text-white transition-colors">+51 946 215 658</a>
                            </li>
                            <li className="flex items-start gap-3 text-white/50 text-sm">
                                <span className="text-[#01a2d8] font-bold mt-0.5 text-xs border border-[#01a2d8]/30 px-1.5 py-0.5 rounded bg-[#01a2d8]/10">PE</span>
                                <span>Lima, Perú<br />Sede Operativa</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BARRA INFERIOR: Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 footer-anim">
                    <p className="text-white/40 text-xs tracking-wider">
                        &copy; {new Date().getFullYear()} J2H Consultoría y Desarrollo de Software. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacidad</a>
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Términos Legales</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};