'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

export default function FAQsManagementPage() {
    const [faqs, setFaqs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/admin/faqs')
            const data = await res.json()
            setFaqs(data.faqs || [])
        } catch (error) {
            console.error('Failed to fetch FAQs:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchFaqs()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
                <button className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-all shadow-lg active:scale-95">
                    <Plus size={20} />
                    <span>Add New FAQ</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Question</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Order</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-3/4" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-12 mx-auto" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : faqs.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No FAQs found. Add your first FAQ to get started.
                                </td>
                            </tr>
                        ) : (
                            faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-500">{faq.order}</td>
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
