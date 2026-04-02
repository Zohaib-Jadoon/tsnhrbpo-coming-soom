"use client"

import { motion } from "framer-motion";
import { Building, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type AuthRole = "HR" | "SEEKER";

interface RoleToggleProps {
    role: AuthRole;
    onChange: (role: AuthRole) => void;
}

export function RoleToggle({ role, onChange }: RoleToggleProps) {
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 flex gap-2 relative">
                {/* Sliding Background */}
                <motion.div
                    initial={false}
                    animate={{ x: role === "HR" ? 0 : 132 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                        "absolute top-1.5 bottom-1.5 w-32 rounded-xl h-[calc(100%-12px)] pointer-events-none",
                        role === "HR"
                            ? "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-lg shadow-cyan-500/20"
                            : "bg-gradient-to-r from-rose-600 to-rose-400 shadow-lg shadow-rose-500/20"
                    )}
                />

                <button
                    onClick={() => onChange("HR")}
                    className={cn(
                        "relative flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 w-32",
                        role === "HR" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <Building className={cn("w-3.5 h-3.5", role === "HR" ? "text-white" : "text-slate-600")} />
                    HR Pro
                </button>

                <button
                    onClick={() => onChange("SEEKER")}
                    className={cn(
                        "relative flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 w-32",
                        role === "SEEKER" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <Sparkles className={cn("w-3.5 h-3.5", role === "SEEKER" ? "text-white" : "text-slate-600")} />
                    Seeker
                </button>
            </div>
        </div>
    );
}
