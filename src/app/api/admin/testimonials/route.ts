export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { date: 'desc' },
        })
        return NextResponse.json({ testimonials })
    } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
    }
}
