'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { useSiteImage } from '@/components/SiteImagesContext'

interface PageHeroProps {
    title: string
    subtitle?: string
    backgroundImage?: string
    siteImageCategory?: string
    showRating?: boolean
    showCTAs?: boolean
}

export function PageHero({
    title,
    subtitle,
    backgroundImage,
    siteImageCategory,
    showRating = false,
    showCTAs = false
}: PageHeroProps) {
    const { image: bgImage, loading: bgLoading } = useSiteImage(siteImageCategory || '')
    const { image: logoImage, loading: logoLoading } = useSiteImage('logo')
    
    const getBackgroundSrc = () => {
        if (bgLoading) return null
        if (bgImage) return bgImage.largeUrl || bgImage.url
        if (backgroundImage) return backgroundImage
        return '/assets/showcase/hero_bg.jpg'
    }
    
    const bgSrc = getBackgroundSrc()
    
    return (
        <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center pt-20 md:pt-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {bgLoading ? (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                ) : bgSrc ? (
                    <img loading="lazy"
                        src={bgSrc}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : null}

                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] scale-150 rotate-12">
                    {logoLoading ? (
                        <div className="w-96 h-96 bg-gray-400 animate-pulse rounded-full" />
                    ) : logoImage ? (
                        <img loading="lazy"
                            src={logoImage.largeUrl || logoImage.url}
                            alt="Blue Horizon Logo"
                            className="w-full max-w-4xl object-contain"
                        />
                    ) : (
                        <img loading="lazy"
                            src="/images/logo.png"
                            alt="Blue Horizon Logo"
                            className="w-full max-w-4xl object-contain"
                        />
                    )}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
                <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {showRating && (
                        <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 bg-secondary/20 border border-secondary/30 text-secondary-light px-4 py-2.5 rounded-full mb-6 md:mb-8 backdrop-blur-sm">
                            <CheckCircle2 size={16} className="text-secondary-light" />
                            <span className="text-xs md:text-sm font-bold tracking-wide uppercase text-secondary-light">5.0 <span className="text-accent">★★★★★</span> Rated | Orange County&apos;s #1 Landscaping</span>
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-6 md:mb-8">
                            {subtitle}
                        </p>
                    )}

                    {showCTAs && (
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-4 md:px-8 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-secondary-dark transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                                <span>Free Estimate</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="tel:9147558141"
                                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-4 md:px-8 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-secondary-dark transition-all shadow-lg hover:scale-105 active:scale-95"
                            >
                                <Phone size={16} className="text-white" />
                                <span>(914) 755-8141</span>
                            </a>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Decorative Accent */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />
        </section>
    )
}
