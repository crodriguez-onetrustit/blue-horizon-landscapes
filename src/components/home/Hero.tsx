'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react'
import { useSiteImage } from '@/components/SiteImagesContext'

export function Hero() {
    const { image: heroImage, loading: heroLoading } = useSiteImage('hero')
    const { image: logoImage, loading: logoLoading } = useSiteImage('logo')
    
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Video */}
            {/* Background Image & Logo */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {heroLoading ? (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                ) : heroImage ? (
                    <img loading="lazy"
                        src={heroImage.largeUrl || heroImage.url}
                        alt="Beautiful landscaping by Blue Horizon in Orange County NY"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <img loading="lazy"
                        src="/assets/showcase/hero_bg.jpg"
                        alt="Beautiful landscaping by Blue Horizon in Orange County NY"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Logo Watermark/Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] scale-150">
                    {logoLoading ? (
                        <div className="w-96 h-96 bg-gray-400 animate-pulse rounded-full" />
                    ) : logoImage ? (
                        <img loading="lazy"
                            src={logoImage.largeUrl || logoImage.url}
                            alt="Blue Horizon Landscapes LLC logo"
                            className="w-full max-w-4xl object-contain rotate-12"
                        />
                    ) : (
                        <img loading="lazy"
                            src="/images/logo.png"
                            alt="Blue Horizon Landscapes LLC logo"
                            className="w-full max-w-4xl object-contain rotate-12"
                        />
                    )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
                <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 bg-secondary/20 border border-secondary/30 text-secondary-light px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                            <CheckCircle2 size={16} className="text-secondary-light" />
                            <span className="text-sm font-bold tracking-wide uppercase text-secondary-light">5.0 <span className="text-accent">★★★★★</span> Rated | Orange County's #1 Landscaping</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                            Crafting Stunning Outdoor Spaces That <span className="text-secondary-light">Transform Your Property</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            From elegant hardscaping to lush lawns, we bring your dream landscape to life with precision, passion, and premium materials. Your trusted local experts in Orange County.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                href="/contact"
                                className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-secondary text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-secondary-dark transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                                <span>Free Estimate</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="tel:9147558141"
                                className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-white/10 border border-white/20 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-md"
                            >
                                <Phone size={20} className="text-secondary-light" />
                                <span>(914) 755-8141</span>
                            </a>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-secondary-light font-bold text-2xl">5.0 / 5</p>
                                <p className="text-gray-400 text-sm">Google Rating</p>
                            </div>
                            <div>
                                <p className="text-white font-bold text-2xl">24/7</p>
                                <p className="text-gray-400 text-sm">Service Availability</p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-white font-bold text-2xl">Premium</p>
                                <p className="text-gray-400 text-sm">Equiptment & Care</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hero Accent Decoration */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
        </section>
    )
}
