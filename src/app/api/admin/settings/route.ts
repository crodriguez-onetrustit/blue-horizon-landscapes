export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const settings = await prisma.siteSettings.findFirst()
        return NextResponse.json({ settings })
    } catch (error) {
        console.error('Failed to fetch settings:', error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const settings = await prisma.siteSettings.upsert({
            where: { id: 'default' },
            update: data,
            create: { id: 'default', ...data },
        })
        return NextResponse.json({ settings })
    } catch (error) {
        console.error('Failed to save settings:', error)
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }
}
