"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { HR_CHAPTERS } from "@/data/services"
import Link from "next/link"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [activeMobileChapter, setActiveMobileChapter] = useState<string | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setServicesOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setServicesOpen(false)
        }, 300)
    }

    return (
        <nav
            onMouseLeave={handleMouseLeave}
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => {
                        setMobileMenuOpen(false)
                        setServicesOpen(false)
                    }}
                    className="cursor-pointer flex items-center gap-3 group shrink-0"
                >
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-400 p-[1px]">
                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950">
                            <span className="text-white font-black text-xl leading-none">T</span>
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-indigo-500 blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        TSN<span className="font-light text-slate-400">HR</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">BPO</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10 text-sm font-semibold tracking-wide transition-all duration-300">
                    <Link
                        href="/about"
                        className="text-slate-300 hover:text-white py-2"
                    >
                        About Us
                    </Link>

                    <div className="relative">
                        <button
                            onMouseEnter={handleMouseEnter}
                            className={cn(
                                "flex items-center gap-1.5 transition-all duration-300 py-2",
                                servicesOpen ? "text-cyan-400" : "text-slate-300 hover:text-white"
                            )}
                        >
                            Our Services
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", servicesOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {servicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    onMouseEnter={handleMouseEnter}
                                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[900px] bg-[#030712]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-8"
                                >
                                    <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                                        {HR_CHAPTERS.map((chapter) => (
                                            <div key={chapter.id} className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-mono font-bold text-cyan-500/70 bg-cyan-500/10 px-1.5 py-0.5 rounded tracking-tighter">
                                                        CH {chapter.number}
                                                    </span>
                                                    <h4 className="text-sm font-bold text-white tracking-wide border-l border-white/10 pl-2">
                                                        {chapter.title.split(' & ')[0]}
                                                    </h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {chapter.services.slice(0, 3).map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={`/services/${chapter.id}`}
                                                                onClick={() => setServicesOpen(false)}
                                                                className="text-[13px] text-slate-400 hover:text-cyan-400 transition-colors text-left leading-tight block w-full truncate"
                                                            >
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    {chapter.services.length > 3 && (
                                                        <li>
                                                            <Link 
                                                                href={`/services/${chapter.id}`}
                                                                onClick={() => setServicesOpen(false)}
                                                                className="text-[11px] font-bold text-indigo-400 hover:text-white flex items-center gap-1 group/more transition-colors"
                                                            >
                                                                View {chapter.services.length - 3} More
                                                                <ArrowRight className="w-3 h-3 group-hover/more:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                        
                                        {/* Featured Promotion Card in Menu */}
                                        <div className="col-span-1 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                                            <div>
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <h5 className="text-white font-bold text-sm mb-2">Need a Custom BPO Solution?</h5>
                                                <p className="text-slate-400 text-xs leading-relaxed">
                                                    Get a tailored strategy for your organization's unique HR needs.
                                                </p>
                                            </div>
                                            <Link 
                                                href="/services/recruitment"
                                                onClick={() => setServicesOpen(false)}
                                                className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold transition-colors text-center"
                                            >
                                                Start Consultation
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a
                        href="mailto:contact@tsnhrbpo.com"
                        className="group relative inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-7 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
                    >
                        Contact Sales
                        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 blur-lg transition-opacity group-hover:opacity-30"></div>
                    </a>
                </div>

                {/* Mobile Icons */}
                <div className="lg:hidden flex items-center gap-4">
                     <button
                        className="text-slate-300 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#020617] border-b border-white/5 overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <Link
                                    href="/about"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white flex items-center justify-between"
                                >
                                    About Us
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                </Link>

                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 pt-2">Capabilities</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {HR_CHAPTERS.map((chapter) => (
                                        <div key={chapter.id} className="rounded-xl border border-white/5 overflow-hidden">
                                            <button
                                                onClick={() => setActiveMobileChapter(activeMobileChapter === chapter.id ? null : chapter.id)}
                                                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-mono text-cyan-400">CH {chapter.number}</span>
                                                    <span className="text-sm font-bold text-white">{chapter.title}</span>
                                                </div>
                                                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", activeMobileChapter === chapter.id && "rotate-180")} />
                                            </button>
                                            <AnimatePresence>
                                                {activeMobileChapter === chapter.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="bg-slate-950/50 p-4 pt-0"
                                                    >
                                                        <ul className="space-y-3 pt-4 border-t border-white/5">
                                                            {chapter.services.slice(0, 5).map((item, i) => (
                                                                <li key={i} className="flex items-center gap-2">
                                                                    <div className="w-1 h-1 rounded-full bg-cyan-500/50" />
                                                                    <Link 
                                                                        href={`/services/${chapter.id}`}
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                        className="text-xs text-slate-400 text-left"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                            <li>
                                                                <Link
                                                                    href={`/services/${chapter.id}`}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                    className="text-xs font-bold text-cyan-400 mt-2 block"
                                                                >
                                                                    View Full Chapter Deep-Dive
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="mailto:contact@tsnhrbpo.com"
                                className="block w-full text-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
