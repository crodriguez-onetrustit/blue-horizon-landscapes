'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Simple direct check for now
        // In production, this would be a server action or API route set cookie
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        })

        if (response.ok) {
            router.push('/admin/dashboard')
        } else {
            setError('Invalid password')
        }
    }

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-primary-light p-10 rounded-[2rem] shadow-2xl text-center border border-white/10">
                <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
                    <Lock size={32} />
                </div>

                <h1 className="text-3xl font-extrabold text-white mb-2">Admin Access</h1>
                <p className="text-gray-400 mb-8 font-medium">Please enter your password to continue</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-center text-xl tracking-widest"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 font-bold text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary-dark transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-12">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                        ← Return to Public Site
                    </Link>
                </div>
            </div>
        </div>
    )
}

import Link from 'next/link'
