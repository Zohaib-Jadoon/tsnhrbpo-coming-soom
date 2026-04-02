"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Target, Eye, Shield, Award, Users, ArrowRight, BookOpen, Globe, Cpu } from "lucide-react"
import Navbar from "@/components/Navbar"
import Link from "next/link"

const SectionHeader = ({ title, subtitle, badge }: { title: string, subtitle: string, badge?: string }) => (
    <div className="space-y-4 mb-16 px-4">
        {badge && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
            >
                <Sparkles className="w-3 h-3" />
                {badge}
            </motion.div>
        )}
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight"
        >
            {title}
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-medium leading-relaxed max-w-3xl"
        >
            {subtitle}
        </motion.p>
    </div>
)

const Card = ({ title, description, icon: Icon, delay = 0 }: { title: string, description: string, icon: any, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group relative p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-slate-900/60 hover:border-cyan-500/30"
    >
        <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
                <Icon className="w-7 h-7 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
            </div>
        </div>
    </motion.div>
)

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#020617] selection:bg-cyan-500/30 pt-32 pb-20 overflow-hidden relative">
            <Navbar />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] anima-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] anima-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Hero Section */}
                <div className="mb-32 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Globe className="w-3 h-3" />
                        Our Global Mission
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                    >
                        Human Capital, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-cyan-400 italic">Redefined.</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl text-xl md:text-2xl text-slate-400 font-medium leading-relaxed"
                    >
                        TSNHRBPO is a technology-first HR Outsourcing organization dedicated to transforming complex human capital challenges into scalable enterprise advantages.
                    </motion.p>
                </div>

                {/* Our Story / Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <SectionHeader 
                            title="The Journey of TSNHRBPO"
                            subtitle="Born from the convergence of industry-leading HR expertise and cutting-edge process automation."
                            badge="Our Story"
                        />
                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-medium">
                            <p>
                                TSNHRBPO was founded with a singular purpose: to bridge the gap between traditional HR practices and the high-performance demands of the modern enterprise. We recognized that in a world of rapid digital transformation, human capital management remains the ultimate competitive differentiator.
                            </p>
                            <p>
                                By combining localized expertise with a global perspective, we've developed a unified HR ecosystem that spans across 11 critical chapters—from recruitment and lifecycle management to strategic compensation and compliance.
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl" />
                        <div className="relative p-12 bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                    <Cpu className="w-10 h-10 text-cyan-400" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 mt-12 space-y-4">
                                    <Globe className="w-10 h-10 text-indigo-400" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                    <Sparkles className="w-10 h-10 text-white" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 mt-12 space-y-4">
                                    <Users className="w-10 h-10 text-slate-500" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Leadership Section */}
                <div className="mb-40">
                    <SectionHeader 
                        title="Meet Our Leadership"
                        subtitle="Guided by visionaries who understand that technology and humanity are not mutually exclusive."
                        badge="Innovation Leaders"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Featured: Dr. Fawad Asif */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1 group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/10 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 space-y-8">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center p-[1px]">
                                    <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center text-3xl font-black text-white">
                                        FA
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-white">Dr. Fawad Asif</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                        Executive Leadership
                                    </div>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        Bringing decades of strategic experience in human resource development and organizational behavioral science.
                                    </p>
                                    <div className="pt-6 border-t border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                                        Full Profile Pending...
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Story Card 1 */}
                        <Card 
                            title="Integrity First"
                            description="We believe that transparency is the foundation of any successful HR partnership. Our processes are auditable, ethical, and built on trust."
                            icon={Shield}
                            delay={0.1}
                        />
                        
                        {/* Story Card 2 */}
                        <Card 
                            title="Global Standards"
                            description="Implementing localized solutions with international BPO quality benchmarks to ensure your workforce scales with global excellence."
                            icon={Award}
                            delay={0.2}
                        />
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
                    <div className="p-12 rounded-[3rem] bg-indigo-600 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-4xl font-extrabold text-white">Our Mission</h3>
                            <p className="text-xl text-indigo-100 font-medium leading-relaxed opacity-90">
                                To empower organizations by delivering seamless, AI-integrated human resource solutions that drive efficiency, growth, and sustainable competitive advantage.
                            </p>
                        </div>
                    </div>

                    <div className="p-12 rounded-[3rem] bg-[#0f172a] border border-white/10 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                                <Eye className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-4xl font-extrabold text-white">Our Vision</h3>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                To be the world's most trusted partner in Human Capital Architecture, seting the global standard for the convergence of HR expertise and process technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-16 rounded-[4rem] bg-slate-900 border border-white/5 overflow-hidden text-center space-y-8"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Ready to Begin Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">HR Transformation?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/services/recruitment">
                            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/20">
                                Explore Our Solutions
                            </button>
                        </Link>
                        <Link href="mailto:contact@tsnhrbpo.com">
                            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-2xl transition-all">
                                Contact Advisory
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
