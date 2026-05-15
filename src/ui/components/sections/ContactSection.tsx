// src/ui/components/sections/ContactSection.tsx
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser'; // 🔥 1. Importamos EmailJS

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null); // 🔥 2. Creamos la referencia al formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useGSAP(() => {
        const elements = gsap.utils.toArray('.contact-anim');
        gsap.from(elements, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 🔥 DEBUG: Verificamos si Vite está leyendo las llaves
            console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
            console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
            console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current!,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Si todo sale bien, mostramos éxito y limpiamos
            setIsSent(true);
            formRef.current?.reset();

            setTimeout(() => {
                setIsSent(false);
            }, 3000);

        } catch (error) {
            console.error("Error enviando el correo:", error);
            alert("Hubo un problema al enviar el mensaje. Verifica la consola.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contacto"
            ref={sectionRef}
            className="relative min-h-screen flex items-center py-32 z-10 bg-transparent border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">

                {/* COLUMNA IZQUIERDA: Textos y Datos */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="contact-anim">
                        <p className="text-[#01a2d8] tracking-[0.3em] text-sm md:text-base font-medium mb-4 uppercase">
                            Conecta con nosotros
                        </p>
                        <h2 className="font-bebas text-6xl md:text-8xl text-white mb-6 leading-[0.9]">
                            INICIEMOS UN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01a2d8] to-white/50">
                                PROYECTO
                            </span>
                        </h2>
                        <p className="text-white/50 text-lg max-w-md font-light mb-12">
                            Ya sea que necesites escalar tu arquitectura actual o construir un producto desde cero, nuestro equipo técnico está listo para el desafío.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 contact-anim">
                        {/* ITEM: Correo */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#01a2d8]/20 group-hover:border-[#01a2d8]/50">
                                <Mail className="text-white/70 group-hover:text-[#01a2d8] transition-colors" size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-white/40 text-sm font-medium tracking-wider uppercase mb-1">Email</p>
                                <a href="mailto:jesus.naun@j2hsoft.com" className="text-white text-lg hover:text-[#01a2d8] transition-colors">
                                    jesus.naun@j2hsoft.com
                                </a>
                            </div>
                        </div>

                        {/* ITEM: Teléfono */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#01a2d8]/20 group-hover:border-[#01a2d8]/50">
                                <Phone className="text-white/70 group-hover:text-[#01a2d8] transition-colors" size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-white/40 text-sm font-medium tracking-wider uppercase mb-1">Línea Directa</p>
                                <a href="tel:+51946215658" className="text-white text-lg hover:text-[#01a2d8] transition-colors">
                                    +51 946 215 658
                                </a>
                            </div>
                        </div>

                        {/* ITEM: Ubicación */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#01a2d8]/20 group-hover:border-[#01a2d8]/50">
                                <MapPin className="text-white/70 group-hover:text-[#01a2d8] transition-colors" size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-white/40 text-sm font-medium tracking-wider uppercase mb-1">Sede</p>
                                <p className="text-white text-lg">
                                    Lima, Perú
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Formulario Glassmorphism */}
                <div className="w-full lg:w-1/2 contact-anim">
                    <form
                        ref={formRef} // 🔥 4. Conectamos la referencia al HTML
                        onSubmit={handleSubmit}
                        className="relative w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    >
                        {/* Brillo de fondo del formulario */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#01a2d8] opacity-[0.05] blur-[80px] rounded-full pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/60 text-sm tracking-wide">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="user_name" // 🔥 5. Variables para EmailJS
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#01a2d8]/50 focus:ring-1 focus:ring-[#01a2d8]/50 transition-all"
                                    placeholder="Ej. John Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/60 text-sm tracking-wide">Empresa</label>
                                <input
                                    type="text"
                                    name="user_company" // 🔥 Variables para EmailJS
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#01a2d8]/50 focus:ring-1 focus:ring-[#01a2d8]/50 transition-all"
                                    placeholder="Tu compañía"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-6">
                            <label className="text-white/60 text-sm tracking-wide">Correo Corporativo</label>
                            <input
                                type="email"
                                name="user_email" // 🔥 Variables para EmailJS
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#01a2d8]/50 focus:ring-1 focus:ring-[#01a2d8]/50 transition-all"
                                placeholder="john@empresa.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mb-8">
                            <label className="text-white/60 text-sm tracking-wide">Detalles del Proyecto</label>
                            <textarea
                                name="message" // 🔥 Variables para EmailJS
                                required
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#01a2d8]/50 focus:ring-1 focus:ring-[#01a2d8]/50 transition-all resize-none"
                                placeholder="Describe brevemente los requerimientos técnicos y el alcance esperado..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSent}
                            className={`w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-300 ${isSent
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : 'bg-[#01a2d8] text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(1,162,216,0.3)]'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Procesando solicitud...</span>
                            ) : isSent ? (
                                <>
                                    <CheckCircle2 size={20} />
                                    <span>¡Mensaje Enviado Exitosamente!</span>
                                </>
                            ) : (
                                <>
                                    <span>Enviar Propuesta</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};