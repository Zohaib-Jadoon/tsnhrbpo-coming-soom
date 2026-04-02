"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Mail, Phone, Building2, MessageSquare, Loader2, CheckCircle2 } from "lucide-react"

interface InquiryFormProps {
    serviceId: string;
    onSuccess?: () => void;
}

export default function InquiryForm({ serviceId, onSuccess }: InquiryFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const response = await fetch("/api/leads/recruitment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, serviceId })
            })

            if (response.ok) {
                setStatus("success")
                setTimeout(() => {
                    onSuccess?.()
                }, 2000)
            } else {
                setStatus("error")
            }
        } catch (error) {
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
            >
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Request Received</h3>
                <p className="text-slate-400 max-w-xs">Our recruitment experts will reach out within 24 hours.</p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-inner"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Work Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            required
                            type="email"
                            placeholder="john@company.com"
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-inner"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Phone Number</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            required
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-inner"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Company</label>
                    <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            required
                            type="text"
                            placeholder="Enterprise Inc."
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-inner"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">How can we help?</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <textarea
                        required
                        rows={4}
                        placeholder={`Tell us about your ${serviceId || 'HR'} needs...`}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-inner resize-none"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>
            </div>

            <button
                disabled={status === "loading"}
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 py-5 bg-white text-slate-950 font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Inquiry
                    </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            {status === "error" && (
                <p className="text-center text-red-400 text-sm font-medium">
                    Something went wrong. Please try again or email us directly.
                </p>
            )}
        </form>
    )
}
