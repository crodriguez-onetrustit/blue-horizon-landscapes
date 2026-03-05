'use client'

import { ReactNode, useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

interface SiteImage {
    category: string
    image: {
        id: string
        url: string
        thumbUrl: string
        mediumUrl: string | null
        largeUrl: string | null
        alt: string | null
        title: string | null
    } | null
}

interface SiteImagesContextType {
    siteImages: Record<string, SiteImage['image']>
    loading: boolean
    refresh: () => void
}

const SiteImagesContext = createContext<SiteImagesContextType>({
    siteImages: {},
    loading: true,
    refresh: () => {}
})

export function useSiteImage(category: string): { image: SiteImage['image']; loading: boolean } {
    const context = useContext(SiteImagesContext)
    return { image: context.siteImages[category] || null, loading: context.loading }
}

export function SiteImagesProvider({ children }: { children: ReactNode }) {
    const [siteImages, setSiteImages] = useState<Record<string, SiteImage['image']>>({})
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    async function fetchSiteImages() {
        try {
            const res = await fetch('/api/admin/site-images')
            const data = await res.json()
            
            const images: Record<string, SiteImage['image']> = {}
            for (const item of data.siteImages || []) {
                images[item.category] = item.image
            }
            setSiteImages(images)
        } catch (error) {
            console.error('Failed to fetch site images:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setMounted(true)
        fetchSiteImages()
    }, [])

    return (
        <SiteImagesContext.Provider value={{ siteImages, loading: loading || !mounted, refresh: fetchSiteImages }}>
            {children}
        </SiteImagesContext.Provider>
    )
}
