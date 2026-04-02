"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, ChevronRight, Briefcase, Zap, Shield, Target, Cpu, BookOpen, Heart, BarChart3, Scale, Layers, Settings } from "lucide-react"
import { HR_CHAPTERS, ServiceChapter } from "@/data/services"
import Link from "next/link"

const CHAPTER_ICONS: Record<string, any> = {
    recruitment: Briefcase,
    onboarding: Users,
    payroll: Sparkles,
    attendance: Zap,
    performance: Target,
    learning: BookOpen,
    engagement: Heart,
    tech: Cpu,
    compliance: Scale,
    assessments: BarChart3,
    strategic: Settings
}

import { Users } from "lucide-react"

const ServiceCard = ({ service, index }: { service: ServiceChapter, index: number }) => {
    const Icon = CHAPTER_ICONS[service.id] || GridIcon

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative"
        >
            <Link href={`/services/${service.id}`} className="block h-full">
                <div className="relative h-full p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-slate-900/60 hover:border-cyan-500/30 hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    {/* Hover Glow */}
                    <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Chapter Badge */}
                    <div className="relative z-10 flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
                                {Icon ? <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" /> : null}
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-black text-cyan-500/50 uppercase tracking-widest font-mono">Chapter</span>
                                <p className="text-sm font-black text-white leading-none">{service.number}</p>
                            </div>
                        </div>
                        <div className="text-white/20 group-hover:text-cyan-400 transition-colors">
                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-500">
                            {service.title}
                        </h3>
                        <p className="text-slate-400 font-medium leading-relaxed line-clamp-2 min-h-[3rem]">
                            {service.description}
                        </p>
                    </div>

                    {/* Bottom Line indicators */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Explore Deep-Dive</span>
                        <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500/50 transition-colors" />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

function GridIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    )
}

export default function Services() {
    return (
        <section id="services-overview" className="relative py-32 bg-[#020617] overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center space-y-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Layers className="w-3 h-3" />
                        Our HR Ecosystem
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight"
                    >
                        Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">Capabilities</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl mx-auto text-xl text-slate-400 font-medium leading-relaxed"
                    >
                        A unified human capital architecture covering all 11 critical HR pillars. Select a chapter to explore our high-fidelity enterprise solutions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {HR_CHAPTERS.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                    
                    {/* Custom Solution Portal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 lg:col-span-3 mt-12"
                    >
                        <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-indigo-900 overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
                            
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 text-indigo-200 text-sm font-bold uppercase tracking-widest">
                                        <Sparkles className="w-4 h-4" />
                                        Advanced BPO Strategy
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                        Need a Custom <br /> HR Architecture?
                                    </h3>
                                    <p className="text-indigo-100 text-lg md:text-xl font-medium leading-relaxed opacity-80">
                                        Our consultants specialize in tailoring these 11 chapters to fit your organization&apos;s unique DNA and scale requirements.
                                    </p>
                                    <Link 
                                        href="mailto:contact@tsnhrbpo.com"
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 font-black rounded-2xl transition-all hover:pr-12 hover:shadow-2xl"
                                    >
                                        Speak with an Advisor
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                                <div className="hidden lg:block relative">
                                    <motion.div
                                        animate={{ 
                                            rotate: [0, 5, 0, -5, 0],
                                            y: [0, -10, 0]
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl"
                                    >
                                        <div className="space-y-6">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/10" />
                                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                                </div>
                                            ))}
                                            <div className="pt-4 flex justify-end">
                                                <div className="w-32 h-10 bg-cyan-400 rounded-xl" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
