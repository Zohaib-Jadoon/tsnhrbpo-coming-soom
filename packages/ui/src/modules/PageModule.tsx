
import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

interface PageModuleProps {
    title: string;
    description: string;
    services: { name: string; aiWorkflow: string; slug?: string }[];
    icon: React.ElementType;
}

export function PageModule({ title, description, services, icon: Icon }: PageModuleProps) {
    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Module Hero */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-12 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150">
                    {Icon && <Icon size={200} />}
                </div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-3 text-cyan-400 mb-6">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <Zap size={16} className="animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">TSN Precision Module</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-[0.9] tracking-tighter">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </div>

            {/* AI Workflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => {
                    const content = (
                        <>
                            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/10 transition-colors shadow-inner">
                                {Icon && <Icon className="text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-between group-hover:text-cyan-400 transition-colors">
                                {service.name}
                                <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" size={16} />
                            </h3>
                            <div className="space-y-2">
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Neural Workflow Path</p>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    "{service.aiWorkflow}"
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Initialize Service</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-slate-800 group-hover:bg-cyan-500 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" />
                            </div>
                        </>
                    );

                    const baseClass = "group relative rounded-3xl border border-white/5 bg-slate-950/40 p-8 backdrop-blur-xl hover:border-indigo-500/30 transition-all hover:bg-slate-900/40 shadow-xl overflow-hidden cursor-pointer";

                    return service.slug ? (
                        <Link key={i} href={service.slug} className={baseClass}>
                            {content}
                        </Link>
                    ) : (
                        <div key={i} className={baseClass}>
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
