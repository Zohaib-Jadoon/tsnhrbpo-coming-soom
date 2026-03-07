"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToServices = () => {
        const servicesSection = document.getElementById("services")
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" })
        }
        setMobileMenuOpen(false)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setMobileMenuOpen(false)
    }

    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-[#020617]/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={scrollToTop}
                    className="cursor-pointer flex items-center gap-2 group"
                >
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
                        <span className="text-white font-bold text-lg leading-none">T</span>
                        <div className="absolute inset-0 rounded-lg bg-indigo-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white/90">
                        TSN<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">HRBPO</span>
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={scrollToServices}
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Services
                    </button>

                    <a
                        href="mailto:contact@tsnhrbpo.com"
                        className="group relative inline-flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        <span className="relative inline-flex items-center gap-2">
                            Contact Us
                        </span>
                        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 blur transition-opacity group-hover:opacity-20"></div>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#020617] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl md:hidden">
                    <button
                        onClick={scrollToServices}
                        className="text-left text-lg font-medium text-slate-300 hover:text-white pb-4 border-b border-white/5"
                    >
                        Capabilities
                    </button>
                    <a
                        href="mailto:contact@tsnhrbpo.com"
                        className="text-center rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-3 text-sm font-medium text-white"
                    >
                        Contact Us
                    </a>
                </div>
            )}
        </nav>
    )
}
