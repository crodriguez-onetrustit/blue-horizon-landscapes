'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/admin/testimonials')
            const data = await res.json()
            setTestimonials(data.testimonials || [])
        } catch (error) {
            console.error('Failed to fetch testimonials:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
                <button className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-all shadow-lg active:scale-95">
                    <Plus size={20} />
                    <span>Add New Testimonial</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Client</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rating</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Source</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : testimonials.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No testimonials found. Add your first testimonial to get started.
                                </td>
                            </tr>
                        ) : (
                            testimonials.map((testimonial) => (
                                <tr key={testimonial.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <span className="font-bold text-gray-900">{testimonial.name}</span>
                                            {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{'★'.repeat(testimonial.rating)}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{testimonial.source || 'Google'}</td>
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
