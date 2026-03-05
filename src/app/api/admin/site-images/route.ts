import { NextResponse } from 'next/server'
import { getAllSiteImages, setSiteImage, getSiteImage, type SiteImageCategory } from '@/lib/image-processing'

export async function GET() {
    try {
        const siteImages = await getAllSiteImages()
        return NextResponse.json({ siteImages })
    } catch (error) {
        console.error('Error fetching site images:', error)
        return NextResponse.json({ error: 'Failed to fetch site images' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { category, imageId } = await request.json()
        
        if (!category || !imageId) {
            return NextResponse.json({ error: 'Category and imageId required' }, { status: 400 })
        }

        const success = await setSiteImage(category as SiteImageCategory, imageId)
        
        if (success) {
            const image = await getSiteImage(category as SiteImageCategory)
            return NextResponse.json({ success: true, category, image })
        }
        
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    } catch (error) {
        console.error('Error updating site image:', error)
        return NextResponse.json({ error: 'Failed to update site image' }, { status: 500 })
    }
}
