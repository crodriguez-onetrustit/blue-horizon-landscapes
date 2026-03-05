'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SiteImagesProvider } from '@/components/SiteImagesContext'

export function ClientLayout({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <SiteImagesProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />

            {/* Mobile Tap-to-Call FAB - Hide on admin pages */}
            {!isAdmin && (
                <a
                    href="tel:9147558141"
                    className="fixed bottom-6 right-6 z-40 bg-secondary text-white p-4 rounded-full shadow-2xl md:hidden hover:scale-110 active:scale-95 transition-all"
                    aria-label="Call Us Now"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </a>
            )}
        </SiteImagesProvider>
    )
}
