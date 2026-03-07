"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const SERVICES_DATA = [
    {
        id: "recruitment",
        title: "Recruitment & Talent Acquisition",
        description: "Streamline the entire hiring lifecycle from job creation to final selection.",
        items: [
            "Recruitment Process Outsourcing (RPO)",
            "Executive search / headhunting",
            "Job description creation",
            "Candidate sourcing",
            "Resume screening & shortlisting",
            "Candidate assessments (skills, psychometric)",
            "Interview scheduling & management",
            "Interview evaluation forms",
            "Offer letter preparation & issuance",
            "Talent pipeline management",
            "Employer branding support"
        ]
    },
    {
        id: "onboarding",
        title: "Onboarding & Employee Lifecycle",
        description: "Manage the employee journey ensuring smooth onboarding and lifecycle management.",
        items: [
            "Digital onboarding workflows",
            "Employee document verification",
            "Induction & orientation programs",
            "Probation tracking",
            "Employee contract management"
        ]
    },
    {
        id: "payroll",
        title: "Payroll & Compensation",
        description: "Financial management related to salaries, benefits, and compliance.",
        items: [
            "Payroll processing",
            "Salary calculation",
            "Tax deductions & compliance",
            "Payslip generation",
            "Bonus & incentive management",
            "Expense reimbursement processing",
            "Salary benchmarking & market analysis"
        ]
    },
    {
        id: "attendance",
        title: "Attendance & Workforce Management",
        description: "Track working hours, manage schedules, and optimize workforce productivity.",
        items: [
            "Attendance tracking & timesheets",
            "Leave management & approval workflows",
            "Overtime calculation",
            "Remote work / flexible schedule tracking",
            "Shift scheduling & workforce planning"
        ]
    },
    {
        id: "performance",
        title: "Performance & Talent Management",
        description: "Measure performance, set goals, and plan career development.",
        items: [
            "KPI & goal tracking",
            "Performance appraisals & reviews",
            "360-degree feedback collection",
            "Promotion & succession planning",
            "Talent evaluation & rating"
        ]
    },
    {
        id: "learning",
        title: "Learning & Development",
        description: "Improve employee skills through structured training initiatives.",
        items: [
            "Employee training & development programs",
            "Personalized learning paths",
            "Certification tracking",
            "Leadership development programs",
            "Learning progress monitoring"
        ]
    },
    {
        id: "engagement",
        title: "Employee Engagement & Retention",
        description: "Improve satisfaction through feedback and recognition programs.",
        items: [
            "Employee surveys & pulse checks",
            "Engagement analytics & reports",
            "Recognition & reward programs",
            "Exit interviews & attrition analysis"
        ]
    },
    {
        id: "tech",
        title: "HR Technology & Analytics",
        description: "Advanced analytics to help make data-driven HR decisions.",
        items: [
            "HRIS / HR Management System implementation",
            "HR analytics & reporting dashboards",
            "Workforce planning & forecasting",
            "HR automation consulting"
        ]
    },
    {
        id: "compliance",
        title: "Compliance & Policy Management",
        description: "Ensure HR operations comply with laws and company policies.",
        items: [
            "HR policies creation & management",
            "Legal & regulatory compliance",
            "Employee handbook & guidelines",
            "Audit & risk management"
        ]
    },
    {
        id: "assessments",
        title: "Talent Assessment & Psychometrics",
        description: "Evaluate candidate abilities through structured assessments.",
        items: [
            "Cognitive ability testing",
            "Personality & behavioral assessments",
            "Leadership potential evaluations",
            "Skill gap analysis",
            "Assessment result reporting"
        ]
    },
    {
        id: "strategic",
        title: "Strategic HR Consulting",
        description: "Advisory services aimed at improving long-term human capital development.",
        items: [
            "Organizational structure design",
            "Workforce optimization",
            "HR process improvement",
            "Compensation & benefits strategy",
            "Succession planning",
            "Change management support"
        ]
    }
]

const StoryChapter = ({ service, index }: { service: typeof SERVICES_DATA[0], index: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Subtle parallax effect for the title
    const yTitle = useTransform(scrollYProgress, [0, 1], [40, -40])
    const opacityBody = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3])

    return (
        <motion.div
            ref={ref}
            style={{ opacity: opacityBody }}
            className="relative py-16 lg:py-24"
        >
            {/* Decorative Chapter Marker (Left side) */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
                <motion.div
                    style={{
                        scaleY: scrollYProgress,
                        transformOrigin: "top"
                    }}
                    className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10" />
            </div>

            <div className="lg:pl-20 relative z-10 w-full max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Text Content (Left Side) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-10%" }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-300 text-sm font-semibold tracking-wider font-mono shadow-inner backdrop-blur-md"
                            >
                                <span className="text-cyan-400">Chapter</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                {(index + 1).toString().padStart(2, '0')}
                            </motion.div>

                            <motion.h3
                                style={{ y: yTitle }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight text-balance drop-shadow-xl"
                            >
                                {service.title.split(' & ').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400 block sm:inline"> & </span>
                                        )}
                                    </span>
                                ))}
                            </motion.h3>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-20%" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-slate-300 leading-relaxed font-light drop-shadow-md bg-slate-950/20 rounded-xl p-2 -ml-2"
                        >
                            {service.description}
                        </motion.p>
                    </div>

                    {/* Features Grid (Right Side) */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {service.items.map((item: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: false, margin: "-10%" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.05, // Staggered entry
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }}
                                    className="flex items-start gap-4 p-5 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 group shadow-2xl shadow-black/40"
                                >
                                    <div className="mt-1 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                                        <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <span className="text-base text-slate-200 group-hover:text-white transition-colors leading-relaxed font-medium">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // We keep the image objects in state to retain them after loading
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    // Track scroll exactly proportional to the entire Services section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // 1. Preload Images seamlessly into browser memory
    useEffect(() => {
        let loadedCount = 0
        const totalFrames = 100
        const loadedImages: HTMLImageElement[] = new Array(totalFrames)

        const trySetLoaded = () => {
            loadedCount++
            setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100))
            if (loadedCount === totalFrames) {
                setImages(loadedImages)
                setIsLoaded(true)
            }
        }

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image()
            const frameNum = i.toString().padStart(3, '0') // 1 -> 001
            // Use the correct path for public images
            img.src = `/frames/${frameNum}.png`
            img.onload = trySetLoaded
            img.onerror = trySetLoaded
            loadedImages[i - 1] = img
        }
    }, [])

    // 2. High-performance Canvas Renderer
    const drawFrame = (frameIndex: number) => {
        if (!canvasRef.current || images.length !== 100) return
        const context = canvasRef.current.getContext("2d")
        const image = images[frameIndex]

        if (context && image && image.complete && image.naturalWidth > 0) {
            const cw = canvasRef.current.width
            const ch = canvasRef.current.height
            context.clearRect(0, 0, cw, ch)

            const canvasRatio = cw / ch
            const imageRatio = image.width / image.height

            let drawWidth = cw
            let drawHeight = ch
            let drawX = 0
            let drawY = 0

            // Match 'object-cover' CSS behavior
            if (canvasRatio > imageRatio) {
                drawHeight = cw / imageRatio
                drawY = (ch - drawHeight) / 2
            } else {
                drawWidth = ch * imageRatio
                drawX = (cw - drawWidth) / 2
            }

            context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
        }
    }

    // 3. Keep Canvas scaled correctly to Viewport + Initial Draw
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1
                canvasRef.current.width = window.innerWidth * dpr
                canvasRef.current.height = window.innerHeight * dpr

                const maxFrame = 99
                let currentFrame = Math.floor(scrollYProgress.get() * maxFrame)
                if (isNaN(currentFrame)) currentFrame = 0
                currentFrame = Math.min(maxFrame, Math.max(0, currentFrame))
                drawFrame(currentFrame)
            }
        }

        if (isLoaded) {
            handleResize()
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, images])

    // 4. Scrubbing engine driven by scroll position
    useMotionValueEvent(scrollYProgress, "change", (latestFraction) => {
        if (!isLoaded) return
        const maxFrameIndex = 99
        let frameIndex = Math.min(maxFrameIndex, Math.max(0, Math.floor(latestFraction * maxFrameIndex)))
        requestAnimationFrame(() => drawFrame(frameIndex))
    })

    return (
        <section ref={containerRef} id="services" className="relative w-full bg-[#020617]">

            {/* BULLETPROOF STICKY CANVAS BACKGROUND */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0 pointer-events-none">

                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#020617]">
                        <div className="w-48 h-1 overflow-hidden bg-slate-800 rounded-full">
                            <motion.div
                                className="h-full bg-cyan-400"
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <p className="mt-4 text-xs font-mono tracking-widest text-slate-500 uppercase">Loading Assets...</p>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full transition-opacity duration-1000 object-cover"
                    style={{ opacity: isLoaded ? 0.35 : 0 }}
                />

                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-[#020617]/50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-80" />
            </div>

            {/* CONTENT OVERLAY: pulled up to overlap the sticky canvas perfectly */}
            <div className="relative z-10 w-full -mt-[100vh]">
                {/* Global Section Header */}
                <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
                            Comprehensive <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                HR Capabilities
                            </span>
                        </h2>
                        <p className="text-slate-300 text-lg md:text-xl font-light drop-shadow-md">
                            From talent acquisition to payroll and strategic consulting, our full suite of services ensures your organization scales effortlessly without the operational drag.
                        </p>
                    </motion.div>
                </div>

                {/* The Storyline chapters */}
                <div className="w-full pb-32">
                    {SERVICES_DATA.map((service, index) => (
                        <StoryChapter key={service.id} service={service} index={index} />
                    ))}

                    {/* End of story decorative element */}
                    <div className="w-full flex justify-center py-20 relative z-10">
                        <div className="w-px h-32 bg-gradient-to-t from-transparent to-cyan-400/50" />
                    </div>
                </div>
            </div>

            {/* Non-intrusive ambient glows bound to the section */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </section>
    )
}
