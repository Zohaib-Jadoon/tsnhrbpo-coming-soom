"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import InquiryForm from "./InquiryForm"
import { ServiceChapter } from "../data/services"

interface ServiceDetailProps {
    service: ServiceChapter
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-20 overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link 
                        href="/"
                        className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Capabilities
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Content: Info & Service List */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-[0.2em] uppercase">
                                Chapter {service.number}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                                {service.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <ChevronRight className="w-6 h-6 text-cyan-400" />
                                Core Capabilities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.services.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                        className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                                    >
                                        <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                                        </div>
                                        <span className="text-slate-300 font-medium leading-tight group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Sticky Form */}
                    <div className="lg:col-span-5 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            
                            <div className="mb-8 space-y-2">
                                <h3 className="text-2xl md:text-3xl font-black text-white">Start Your Chapter</h3>
                                <p className="text-slate-400 font-medium italic">
                                    Talk to our {service.title.toLowerCase().split(' ')[0]} consultants.
                                </p>
                            </div>

                            <InquiryForm serviceId={service.id} />
                            
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Security Guaranteed</p>
                                    <p className="text-xs text-slate-400 font-medium">Enterprise Data Encryption</p>
                                </div>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-cyan-500 flex items-center justify-center text-[10px] font-black text-slate-950">
                                        +50
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
