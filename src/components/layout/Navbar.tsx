'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useSiteImage } from '@/components/SiteImagesContext'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const { image: logoImage, loading: logoLoading } = useSiteImage('logo')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const showTransparent = !scrolled

    return (
        <nav
            suppressHydrationWarning
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
                showTransparent ? 'py-6 bg-transparent' : 'py-3 bg-white shadow-md'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="relative w-12 h-12">
                        {logoLoading ? (
                            <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
                        ) : logoImage ? (
                            <Image
                                src={logoImage.largeUrl || logoImage.url}
                                alt="Blue Horizon Landscapes Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <Image
                                src="/images/logo.png"
                                alt="Blue Horizon Landscapes Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        )}
                    </div>
                    <span className={cn(
                        "font-bold text-xl tracking-tight hidden sm:block",
                        showTransparent ? "text-white" : "text-primary"
                    )}>
                        Blue Horizon <span className="text-secondary">Landscapes</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-secondary',
                                pathname === item.href ? 'text-secondary' : showTransparent ? 'text-white' : 'text-primary'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="tel:9147558141"
                        className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-full font-semibold hover:bg-secondary-dark transition-all shadow-lg hover:scale-105"
                    >
                        <Phone size={18} />
                        <span>(914) 755-8141</span>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 transition-colors",
                        showTransparent ? "text-white" : "text-primary"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 shadow-2xl p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 bg-white border-t border-gray-100">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-lg font-semibold py-2',
                                pathname === item.href ? 'text-secondary' : 'text-primary'
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="tel:9147558141"
                        className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-4 rounded-xl font-bold text-lg"
                    >
                        <Phone />
                        <span>Call Now</span>
                    </a>
                </div>
            )}
        </nav>
    )
}
