import React from 'react'
import {
    Briefcase,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Clock,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Image as ImageIcon } from 'lucide-react'

export const dynamic = 'force-static'

const dashboardCards = [
    { name: 'Active Projects', value: 5, icon: Briefcase, color: 'bg-blue-500', trend: '+2 this month' },
    { name: 'New Submissions', value: 12, icon: MessageSquare, color: 'bg-orange-500', trend: '3 unread' },
    { name: 'Active Services', value: 6, icon: TrendingUp, color: 'bg-green-500', trend: 'Optimized' },
]

export default async function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Welcome & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium">Welcome back to the Blue Horizon admin panel.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Link href="/admin/media" className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center space-x-2">
                        <ExternalLink size={18} />
                        <span>Manage Media</span>
                    </Link>
                    <Link href="/admin/projects" className="px-6 py-3 bg-secondary text-white rounded-xl font-bold text-sm shadow-xl hover:bg-secondary-dark transition-all flex items-center space-x-2">
                        <ArrowUpRight size={18} />
                        <span>New Project</span>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dashboardCards.map((card) => (
                    <div key={card.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2">{card.name}</p>
                            <h3 className="text-4xl font-black text-gray-900 mb-2">{card.value}</h3>
                            <p className="text-xs font-bold text-green-500 flex items-center">
                                <TrendingUp size={12} className="mr-1" />
                                {card.trend}
                            </p>
                        </div>
                        <div className={cn("p-4 rounded-2xl text-white shadow-lg", card.color)}>
                            <card.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900">Recent Enquiries</h3>
                        <Link href="/admin/submissions" className="text-secondary text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="text-center py-10">
                            <MessageSquare size={48} className="text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No new submissions today.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900">System Status</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-green-600 uppercase">All Systems Normal</span>
                        </div>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Automatic Backup</p>
                                <p className="text-sm text-gray-500">Scheduled for tonight at 2:00 AM</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <ImageIcon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Optimization Engine</p>
                                <p className="text-sm text-gray-500">Sharp WebP conversion active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
