import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { password } = await request.json()
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === expectedPassword) {
        const cookieStore = await cookies()
        const forwardedProto = request.headers.get('x-forwarded-proto') || 'http'
        const isHttps = forwardedProto === 'https'

        cookieStore.set('admin_auth', 'true', {
            httpOnly: true,
            secure: isHttps,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
