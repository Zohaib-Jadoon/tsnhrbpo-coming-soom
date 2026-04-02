"use client"

import React, { useRef, useEffect, useState } from "react"
import { useScroll, useMotionValueEvent, motion } from "framer-motion"

export default function AnimatedTransition() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // We keep the image objects in state to retain them after loading
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    // Track scroll exactly proportional to the 400vh container
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
            // Once all frames are fetched, mount the sequence
            if (loadedCount === totalFrames) {
                setImages(loadedImages)
                setIsLoaded(true)
            }
        }

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image()
            const frameNum = i.toString().padStart(3, '0') // 1 -> 001
            img.src = `/frames/${frameNum}.png`
            img.onload = trySetLoaded
            img.onerror = trySetLoaded // ensure we don't hang if one fails
            loadedImages[i - 1] = img
        }
    }, [])

    // 2. High-performance Canvas Renderer
    const drawFrame = (frameIndex: number) => {
        if (!canvasRef.current || images.length !== 100) return
        const context = canvasRef.current.getContext("2d")
        const image = images[frameIndex]

        if (context && image && image.complete && image.naturalWidth > 0) {
            // High DPI bounds
            const cw = canvasRef.current.width
            const ch = canvasRef.current.height
            context.clearRect(0, 0, cw, ch)

            const canvasRatio = cw / ch
            const imageRatio = image.width / image.height

            let drawWidth = cw
            let drawHeight = ch
            let drawX = 0
            let drawY = 0

            // Match 'object-cover' CSS behavior on Canvas to avoid stretching
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

                // Redraw current frame immediately after resize
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
        const frameIndex = Math.min(maxFrameIndex, Math.max(0, Math.floor(latestFraction * maxFrameIndex)))
        requestAnimationFrame(() => drawFrame(frameIndex))
    })

    return (
        // Height 400vh requires the user to scroll down 4 viewport heights to finish the animation
        <section ref={containerRef} className="relative w-full bg-[#020617] h-[400vh]" id="transition-animation">
            {/* Sticky container pins the canvas to screen during the scroll */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center">

                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-48 h-1 overflow-hidden bg-slate-800 rounded-full">
                            <motion.div
                                className="h-full bg-cyan-400"
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <p className="mt-4 text-xs font-mono tracking-widest text-slate-500 uppercase">Preloading Sequence</p>
                    </div>
                )}

                {/* The canvas handles mapping our image frames flawlessly */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                    style={{ opacity: isLoaded ? 1 : 0 }}
                />

                {/* Gradients blend the animation seamlessly into the preceding and following dark sections */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-48 z-10 bg-gradient-to-b from-[#020617] via-[#020617]/50 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
            </div>
        </section>
    )
}
