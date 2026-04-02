"use client"

import React from "react"
import { motion } from "framer-motion"

interface MarqueeProps {
    items: { name: string, label: string }[]
    direction?: "left" | "right"
    speed?: number
    pauseOnHover?: boolean
}

export default function Marquee({ items, direction = "left", speed = 40, pauseOnHover = true }: MarqueeProps) {
    // Duplicate items to create seamless loop
    const doubledItems = [...items, ...items, ...items]
    
    const xRange = direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]

    return (
        <div className="relative w-full overflow-hidden py-12 select-none">
            {/* Gradient Overlays for smooth entry/exit */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

            <motion.div
                className="flex items-center gap-6 w-max"
                animate={{
                    x: xRange
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
            >
                {doubledItems.map((item, idx) => (
                    <div
                        key={`${item.name}-${idx}`}
                        className="group relative flex flex-col items-center justify-center w-64 p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                        <div className="relative z-10 text-center space-y-3">
                            <div className="text-xl font-black text-white/80 group-hover:text-white transition-colors tracking-tighter whitespace-nowrap">
                                {item.name}
                            </div>
                            <div className="h-px w-8 bg-indigo-500/30 group-hover:w-12 group-hover:bg-cyan-500/50 transition-all mx-auto" />
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                                {item.label}
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
