
import React from 'react';
import { Sparkles, ArrowRight, Zap, Shield, Cpu, Activity, Layout } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

interface SubServicePageProps {
    title: string;
    description: string;
    pillar: string;
    pillarHref: string;
    icon: React.ElementType;
    features: string[];
    aiCapabilities: string[];
}

export function SubServicePage({
    title,
    description,
    pillar,
    pillarHref,
    icon: Icon,
    features,
    aiCapabilities
}: SubServicePageProps) {
    return (
        <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
                <span>/</span>
                <Link href={pillarHref} className="hover:text-cyan-400 transition-colors">{pillar}</Link>
                <span>/</span>
                <span className="text-white">{title}</span>
            </div>

            {/* Service Hero */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-slate-900/40 p-12 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 pointer-events-none">
                    {Icon && <Icon size={250} />}
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                            <Activity className="w-3.5 h-3.5" /> High Fidelity Service
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tighter">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-medium">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="h-14 px-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
                                Launch Workflow <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
                                Protocol Docs
                            </button>
                        </div>
                    </div>

                    {/* AI Preview Card */}
                    <div className="relative group hidden lg:block">
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur transition-all group-hover:opacity-40" />
                        <div className="relative bg-slate-950/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                        <Cpu className="text-indigo-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cognitive State</p>
                                        <p className="text-sm font-bold text-white">Active Processing</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse" />
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Neural Directives</p>
                                {aiCapabilities.map((cap, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 group/item hover:border-cyan-500/30 transition-all">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 group-hover/item:bg-cyan-400 transition-colors" />
                                        <span className="text-xs text-slate-400 group-hover/item:text-white transition-colors">
                                            {cap}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Triple Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Feature List */}
                <div className="lg:col-span-2 p-8 lg:p-12 rounded-[40px] border border-white/5 bg-slate-950/40 backdrop-blur-3xl space-y-10">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Standard Capabilities</h2>
                        <p className="text-sm text-slate-500 font-medium">Enterprise-grade service components for {title}.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="mt-1 h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <Shield size={12} className="text-cyan-400" />
                                </div>
                                <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors leading-relaxed">
                                    {feat}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard Integration */}
                <div className="p-8 rounded-[40px] border border-white/5 bg-slate-950/40 backdrop-blur-3xl space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Ecosystem</h2>
                        <p className="text-sm text-slate-500 font-medium">Integration status within the ERP.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Data Pipeline", value: "Optimized", color: "text-emerald-400" },
                            { label: "Auth Level", value: "Level 4", color: "text-cyan-400" },
                            { label: "AI Latency", value: "< 240ms", color: "text-indigo-400" },
                            { label: "Compliance", value: "Certified", color: "text-amber-400" }
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                <span className={cn("text-xs font-extrabold uppercase tracking-widest", stat.color)}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
                        <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                            "This service is fully linked to the global analytics node. All activity is logged and processed for real-time reporting."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
