export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getAllImages, updateImage, deleteImage } from '@/lib/image-processing'

export async function GET() {
    try {
        console.log('API: Fetching images...')
        const images = await getAllImages()
        console.log('API: Found', images.length, 'images')
        return NextResponse.json({ images })
    } catch (error: any) {
        console.error('Error fetching images:', error.message, error.stack)
        return NextResponse.json({ error: 'Failed to fetch images: ' + error.message }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json()
        if (!id) {
            return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
        }
        const updated = await updateImage(id, data)
        if (updated) {
            return NextResponse.json({ success: true, image: updated })
        }
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
        }

        const deleted = await deleteImage(id)
        if (deleted) {
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }
}
