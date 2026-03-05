import React from 'react'
import { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSiteImage } from '@/components/SiteImagesContext'

interface ServiceCardProps {
    title: string
    description: string
    icon: LucideIcon
    image?: string
    siteCategory?: string
}

export function ServiceCard({ title, description, icon: Icon, image, siteCategory }: ServiceCardProps) {
    const { image: dynamicImage, loading } = useSiteImage(siteCategory || '')
    
    const getImageSrc = () => {
        if (loading) return null
        if (dynamicImage) return dynamicImage.largeUrl || dynamicImage.url
        if (image) return image
        return null
    }
    
    const imageSrc = getImageSrc()
    
    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
            {imageSrc && (
                <div className="h-48 overflow-hidden relative">
                    {loading ? (
                        <div className="w-full h-full bg-gray-200 animate-pulse" />
                    ) : (
                        <img loading="lazy"
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center space-x-2 text-white">
                        <Icon size={20} className="text-secondary-light" />
                        <h3 className="font-bold text-lg">{title}</h3>
                    </div>
                </div>
            )}

            {!imageSrc && (
                <div className="p-8 pb-4">
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
                        <Icon size={28} />
                    </div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
                </div>
            )}

            <div className="p-8 pt-4">
                {!imageSrc && <div className="h-px bg-gray-100 mb-6" />}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {description}
                </p>
                <Link
                    href="/services"
                    className="inline-flex items-center space-x-2 text-secondary font-bold hover:text-secondary-dark transition-colors"
                >
                    <span>Learn More</span>
                    <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    )
}
