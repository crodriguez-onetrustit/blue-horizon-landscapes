'use client'

import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

interface SiteSettings {
    heroTitle: string
    heroSubheadline: string
    phoneNumber: string
    email: string
    address: string
    hours: string
    aboutText: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>({
        heroTitle: '',
        heroSubheadline: '',
        phoneNumber: '',
        email: '',
        address: '',
        hours: '',
        aboutText: '',
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings')
            const data = await res.json()
            if (data.settings) {
                setSettings(data.settings)
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        setMessage('')
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            })
            if (res.ok) {
                setMessage('Settings saved successfully!')
            } else {
                setMessage('Failed to save settings')
            }
        } catch (error) {
            setMessage('Error saving settings')
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-100 rounded w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-100 rounded w-32" />
                            <div className="h-12 bg-gray-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Site Settings</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    <Save size={20} />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-xl ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4">Hero Section</h3>
                
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                        <input
                            type="text"
                            value={settings.heroTitle}
                            onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subheadline</label>
                        <textarea
                            value={settings.heroSubheadline}
                            onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 pt-4">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={settings.phoneNumber}
                            onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address / Service Area</label>
                        <input
                            type="text"
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                        <input
                            type="text"
                            value={settings.hours}
                            onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                            className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 pt-4">About Section</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
                    <textarea
                        value={settings.aboutText}
                        onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
            </div>
        </div>
    )
}
