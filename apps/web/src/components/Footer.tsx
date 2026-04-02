"use client"

import Link from "next/link";
import { Globe, Shield, Sparkles, Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@erp/ui";

const FOOTER_LINKS = [
    {
        title: "Platform",
        links: [
            { name: "Services", href: "/services" },
            { name: "Pricing", href: "/pricing" },
            { name: "AI Engine", href: "/services#recruitment" },
            { name: "Site Explorer", href: "/explorer" }
        ]
    },
    {
        title: "Resources",
        links: [
            { name: "Documentation", href: "/docs" },
            { name: "API Reference", href: "/api" },
            { name: "Institutional Trust", href: "/about" },
            { name: "System Status", href: "/status" }
        ]
    },
    {
        title: "Corporate",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Contact sales", href: "/contact" },
            { name: "Careers", href: "/careers" },
            { name: "Legal & Privacy", href: "/legal" }
        ]
    }
];

export default function Footer() {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">

                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-black text-white tracking-tighter text-xl leading-none">TSNHRBPO</span>
                                <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest mt-1">Institutional Authority</span>
                            </div>
                        </Link>

                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            The definitive AI recruitment and HR operations platform for global enterprises. Engineering workforce intelligence with precision, security, and elite velocity.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Twitter, Linkedin, Github].map((Icon, idx) => (
                                <a key={idx} href="#" className="h-10 w-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all group">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {FOOTER_LINKS.map((group) => (
                            <div key={group.title} className="space-y-6">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{group.title}</h4>
                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            © 2026 TSN Enterprise Solutions. All Rights Reserved.
                        </p>
                        <div className="hidden md:flex items-center gap-3">
                            <Shield className="w-3 h-3 text-cyan-500/50" />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">ISO 27001 Certified Architecture</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-[10px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[10px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors">Terms</Link>
                        <div className="h-4 w-px bg-white/5" />
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Nodes Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
