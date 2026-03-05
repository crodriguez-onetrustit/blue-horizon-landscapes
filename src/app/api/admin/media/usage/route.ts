export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
        }

        return NextResponse.json({ 
            usage: [], 
            message: 'Image usage tracking is not available in this version' 
        })
    } catch (error) {
        console.error('Usage query error:', error)
        return NextResponse.json({ error: 'Failed to get usage' }, { status: 500 })
    }
}
