'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, MoreVertical, Edit2, Trash2, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ServicesManagementPage() {
    const [services, setServices] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchServices = async () => {
        const res = await fetch('/api/admin/services')
        const data = await res.json()
        setServices(data.services)
        setLoading(false)
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
                <button className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold font-sm hover:bg-secondary-dark transition-all shadow-lg active:scale-95">
                    <Plus size={20} />
                    <span>Add New Service</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Service</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Description</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Featured</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-64" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-12 mx-auto" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : services.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No services found. Add your first service to get started.
                                </td>
                            </tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                                                {/* Placeholder Icon */}
                                                <Plus size={20} />
                                            </div>
                                            <span className="font-bold text-gray-900">{service.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm max-w-sm truncate">
                                        {service.description}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {service.featured ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">YES</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs font-bold rounded-full">NO</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-secondary"><Edit2 size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
