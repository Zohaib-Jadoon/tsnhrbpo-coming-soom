"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function Hero() {
    const scrollToServices = () => {
        const servicesSection = document.getElementById("services-overview")
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="/assets/hero_bg.mp4" type="video/mp4" />
                </video>

                {/* Multi-layered Premium Overlays */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wide uppercase"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Next-Generation HR Ecosystem
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tight text-white leading-[0.95] text-balance">
                            Scale Your Talent <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x italic">
                                Without Limits
                            </span>
                        </h1>
                    </div>

                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                        We combine precision AI with enterprise-grade HR chapters to eliminate hiring noise and streamline your entire human capital lifecycle.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={scrollToServices}
                            className="group relative flex items-center gap-3 px-10 py-5 bg-white text-slate-950 font-black rounded-2xl overflow-hidden transition-all hover:pr-12 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10">Explore Our Solutions</span>
                            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                        
                        <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-md">
                            Speak to an Advisor
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.button
                onClick={scrollToServices}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors group"
            >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase ml-1">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center p-1.5">
                    <motion.div 
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-2 bg-current rounded-full" 
                    />
                </div>
            </motion.button>
        </section>
    )
}
