"use client"

import { motion } from "framer-motion"

export default function Hero() {
    const scrollToServices = () => {
        const servicesSection = document.getElementById("services")
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/assets/hero_bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark Overlays for Text Readability */}
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        Launching Soon
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white !leading-tight text-balance">
                        Pakistan&apos;s Smartest <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
                            AI Recruitment Platform
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
                        We are building the definitive solution to eliminate hiring noise, match top talent with elite employers, and streamline every HR operation.
                    </p>

                    <div className="pt-12 flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative"
                        >
                            <motion.span
                                animate={{
                                    letterSpacing: ["0.2em", "0.5em", "0.2em"],
                                    opacity: [0.4, 1, 0.4]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-2xl md:text-3xl font-light text-white uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            >
                                Coming Soon
                            </motion.span>

                            <motion.div
                                animate={{
                                    width: ["0%", "100%", "0%"],
                                    left: ["0%", "0%", "100%"]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -bottom-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToServices}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
            >
                <div className="w-8 h-12 rounded-full border-2 border-current flex justify-center p-2">
                    <div className="w-1.5 h-3 bg-current rounded-full" />
                </div>
            </motion.button>
        </section>
    )
}
