import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react'
import Image from 'next/image'
import { useSiteImage } from '@/components/SiteImagesContext'

export function Footer() {
    const { image: logoImage, loading: logoLoading } = useSiteImage('logo')
    
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12">
                            {logoLoading ? (
                                <div className="w-full h-full bg-white/10 animate-pulse rounded" />
                            ) : logoImage ? (
                                <Image
                                    src={logoImage.largeUrl || logoImage.url}
                                    alt="Blue Horizon Landscapes Logo"
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <Image
                                    src="/images/logo.png"
                                    alt="Blue Horizon Landscapes Logo"
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            Blue Horizon <span className="text-secondary">Landscapes</span>
                        </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        Creating stunning landscapes with exceptional design and meticulous craftsmanship since 2020. Your local experts in Orange County.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/bluehorizonlandscapes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.instagram.com/bluehorizonlandscapes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://nextdoor.com/pages/blue-horizon-landscapes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Nextdoor">
                            <MapPin size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-gray-300">
                        <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-secondary transition-colors">Services</Link></li>
                        <li><Link href="/projects" className="hover:text-secondary transition-colors">Our Projects</Link></li>
                        <li><Link href="/reviews" className="hover:text-secondary transition-colors">Client Reviews</Link></li>
                        <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start space-x-3">
                            <Phone size={20} className="text-secondary shrink-0" />
                            <a href="tel:9147558141" className="hover:text-secondary">(914) 755-8141</a>
                        </li>
                        <li className="flex items-start space-x-3">
                            <Mail size={20} className="text-secondary shrink-0" />
                            <a href="mailto:contact@bluehorizonlandscapes.com" className="hover:text-secondary">contact@bluehorizonlandscapes.com</a>
                        </li>
                        <li className="flex items-start space-x-3">
                            <MapPin size={20} className="text-secondary shrink-0" />
                            <span>Orange County, NY & surrounding areas</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <Clock size={20} className="text-secondary shrink-0" />
                            <span>Open 24 Hours</span>
                        </li>
                    </ul>
                </div>

                {/* Google Review Badge (Simulated) */}
                <div>
                    <h4 className="font-bold text-lg mb-6">Our Reputation</h4>
                    <div className="bg-primary-light p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-accent text-xl">★</span>
                            ))}
                        </div>
                        <p className="font-bold text-lg text-secondary-light">5.0 Rating</p>
                        <p className="text-sm text-gray-400">Based on 19 Google Reviews</p>
                        <Link href="/reviews" className="inline-block mt-4 text-secondary font-semibold hover:underline">
                            Read all reviews →
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
                <p>© {new Date().getFullYear()} Blue Horizon Landscapes LLC. All rights reserved.</p>
                <div className="flex space-x-6">
                    <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}
