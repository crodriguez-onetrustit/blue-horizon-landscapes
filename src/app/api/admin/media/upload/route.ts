export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { processAndStoreImage, processAndReplaceImage } from '@/lib/image-processing'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]
        const imageId = formData.get('imageId') as string | null

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
        }

        if (imageId) {
            const replaced = await processAndReplaceImage(files[0], imageId)
            if (replaced) {
                return NextResponse.json({ success: true, images: [replaced] })
            }
            return NextResponse.json({ error: 'Image not found' }, { status: 404 })
        }

        const savedImages = await Promise.all(
            files.map((file) => processAndStoreImage(file))
        )

        return NextResponse.json({ success: true, images: savedImages })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
