'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Image as ImageIcon,
    Settings,
    MessageSquare,
    PlusCircle,
    LogOut,
    Menu,
    X,
    Briefcase,
    HelpCircle,
    Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Services', href: '/admin/services', icon: PlusCircle },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={cn(
                "bg-primary text-white transition-all duration-300 flex flex-col z-50",
                isSidebarOpen ? "w-64" : "w-20"
            )}>
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <div className={cn("flex items-center space-x-2 overflow-hidden transition-all", isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center font-bold text-sm shrink-0">BH</div>
                        <span className="font-bold whitespace-nowrap">Admin Portal</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-white/10 rounded"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group",
                                pathname === item.href ? "bg-secondary text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={cn("shrink-0", pathname === item.href ? "text-white" : "group-hover:text-secondary-light")} />
                            <span className={cn("font-medium transition-all overflow-hidden whitespace-nowrap", isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        onClick={async () => {
                            await fetch('/api/admin/logout', { method: 'POST' })
                            window.location.href = '/admin'
                        }}
                    >
                        <LogOut size={20} className="shrink-0" />
                        <span className={cn("font-medium transition-all overflow-hidden whitespace-nowrap", isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between h-16">
                    <h2 className="font-bold text-gray-800">
                        {adminNavItems.find(item => item.href === pathname)?.name || 'Admin'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-sm font-medium text-secondary hover:underline">
                            View Site
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300" />
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
