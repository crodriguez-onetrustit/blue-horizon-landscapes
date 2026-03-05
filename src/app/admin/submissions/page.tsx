'use client'

import React, { useState, useEffect } from 'react'
import { Search, Eye, Trash2 } from 'lucide-react'

export default function SubmissionsManagementPage() {
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/admin/submissions')
            const data = await res.json()
            setSubmissions(data.submissions || [])
        } catch (error) {
            console.error('Failed to fetch submissions:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSubmissions()
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-700'
            case 'READ': return 'bg-yellow-100 text-yellow-700'
            case 'CONTACTED': return 'bg-green-100 text-green-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search submissions..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Contact</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Message</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-40" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-48" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20 mx-auto" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : submissions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No submissions found.
                                </td>
                            </tr>
                        ) : (
                            submissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">{submission.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="text-gray-500">{submission.email}</div>
                                        {submission.phone && <div className="text-gray-400">{submission.phone}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {submission.message}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(submission.status)}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-secondary"><Eye size={18} /></button>
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
