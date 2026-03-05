'use client'

import React, { useState, useRef, useEffect } from 'react'

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    aspectRatio?: string
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    aspectRatio = "aspect-[16/9]"
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((clientX - rect.left) / rect.width) * 100
        setSliderPosition(Math.max(0, Math.min(100, x)))
    }

    const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)
    const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

    return (
        <div
            ref={containerRef}
            className={`relative ${aspectRatio} w-full overflow-hidden rounded-3xl select-none cursor-ew-resize group shadow-2xl`}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
        >
            {/* After Image (Background) */}
            <img loading="lazy"
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Clip) */}
            <div
                className="absolute inset-0 w-full h-full border-r-2 border-white/50 z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img loading="lazy"
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Slider Control */}
            <div
                className="absolute inset-y-0 z-20 w-1 bg-white shadow-xl cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-secondary">
                    <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-secondary rounded-full" />
                        <div className="w-0.5 h-4 bg-secondary rounded-full" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 z-20 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Before
            </div>
            <div className="absolute bottom-4 right-4 z-20 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                After
            </div>
        </div>
    )
}
