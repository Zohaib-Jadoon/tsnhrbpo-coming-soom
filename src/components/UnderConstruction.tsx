"use client"

import React from "react"
import { motion } from "framer-motion"

export default function UnderConstruction() {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]"
                />
            </div>

            {/* Central Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Brand Mark Animation */}
                    <div className="relative mb-12">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/5 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400/30 animate-pulse" />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                                className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                            >
                                T
                            </motion.span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase">
                        TSN<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">HRBPO</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-xl md:text-2xl text-slate-400 font-light mb-12 leading-relaxed">
                        We are currently building the next generation of <span className="text-white font-medium">Human Resource</span> infrastructure.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="mailto:contact@tsnhrbpo.com"
                            className="px-10 py-5 rounded-full bg-white text-slate-950 font-bold text-lg shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-cyan-50 transition-colors"
                        >
                            Join the Waitlist
                        </motion.a>

                        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                            <span className="text-slate-300 font-mono text-sm tracking-widest uppercase">Under Construction</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Credit */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-0 right-0 text-center"
            >
                <p className="text-slate-500 text-xs font-mono tracking-[0.3em] uppercase opacity-50">
                    &copy; 2025 TSNHRBPO Group. All rights reserved.
                </p>
            </motion.div>
        </section>
    )
}
