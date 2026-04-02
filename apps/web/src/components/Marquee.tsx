"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface MarqueeProps {
    items: { name: string, label: string, image?: string }[]
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
                className="flex items-center gap-6 w-max px-6"
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
                        className="group relative flex flex-col items-center justify-center w-56 p-6 md:p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                        <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-4">
                            {/* Logo Container */}
                            <div className="h-12 w-full flex items-center justify-center relative">
                                {item.image ? (
                                    <div className="relative w-full h-full filter grayscale brightness-[5] opacity-40 group-hover:filter-none group-hover:opacity-100 transition-all duration-500">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                            sizes="200px"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-xl font-black text-white/40 group-hover:text-white transition-colors tracking-tighter whitespace-nowrap">
                                        {item.name}
                                    </div>
                                )}
                            </div>
                            
                            <div className="h-px w-6 bg-indigo-500/20 group-hover:w-10 group-hover:bg-cyan-500/50 transition-all" />
                            
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none text-center">
                                {item.label}
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
