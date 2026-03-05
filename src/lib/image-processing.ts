import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import heicConvert from 'heic-convert'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads')

async function convertHeicIfNeeded(fileBuffer: Buffer): Promise<Buffer> {
    try {
        const hex = fileBuffer.slice(0, 4).toString('hex')
        if (hex === '66747970' || fileBuffer.toString('ascii', 0, 4) === 'ftyp') {
            console.log('Detected HEIC format, converting...')
            const result = await heicConvert({
                buffer: fileBuffer as any,
                format: 'JPEG',
            })
            return Buffer.from(result)
        }
    } catch (error) {
        console.warn('HEIC conversion failed:', error)
    }
    return fileBuffer
}

// Try multiple possible locations for uploads.json
function findDbFile(): string {
    const possiblePaths = [
        path.join(process.cwd(), 'uploads.json'),
        path.join(__dirname, '..', '..', 'uploads.json'),
        path.join(__dirname, '..', 'uploads.json'),
    ]
    
    for (const p of possiblePaths) {
        try {
            if (fsSync.existsSync(p)) {
                console.log('DB found at:', p)
                return p
            }
        } catch {}
    }
    console.log('DB not found in any location, using default')
    return possiblePaths[0]
}

const DB_FILE = findDbFile()

interface ImageRecord {
    id: string
    url: string
    thumbUrl: string | null
    mediumUrl: string | null
    largeUrl: string | null
    alt: string | null
    title: string | null
    category: string | null
    tags: string | null
    order: number
    createdAt: string
}

async function getDb(): Promise<ImageRecord[]> {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function saveDb(data: ImageRecord[]) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2))
}

export async function processAndStoreImage(file: File) {
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const buffer = await convertHeicIfNeeded(fileBuffer)
    
    const filename = `${uuidv4()}.webp`

    await fs.mkdir(path.join(UPLOAD_DIR, 'thumbnails'), { recursive: true })
    await fs.mkdir(path.join(UPLOAD_DIR, 'medium'), { recursive: true })
    await fs.mkdir(path.join(UPLOAD_DIR, 'large'), { recursive: true })

    const [thumb, medium, large] = await Promise.all([
        sharp(buffer).resize(400).webp({ quality: 80 }).toBuffer(),
        sharp(buffer).resize(800).webp({ quality: 85 }).toBuffer(),
        sharp(buffer).resize(1600).webp({ quality: 90 }).toBuffer(),
    ])

    await Promise.all([
        fs.writeFile(path.join(UPLOAD_DIR, 'thumbnails', filename), thumb),
        fs.writeFile(path.join(UPLOAD_DIR, 'medium', filename), medium),
        fs.writeFile(path.join(UPLOAD_DIR, 'large', filename), large),
    ])

    const images = await getDb()
    const image: ImageRecord = {
        id: uuidv4(),
        url: `/uploads/large/${filename}`,
        thumbUrl: `/uploads/thumbnails/${filename}`,
        mediumUrl: `/uploads/medium/${filename}`,
        largeUrl: `/uploads/large/${filename}`,
        alt: file.name,
        title: file.name,
        category: null,
        tags: null,
        order: images.length,
        createdAt: new Date().toISOString(),
    }

    images.unshift(image)
    await saveDb(images)

    return image
}

export async function processAndReplaceImage(file: File, imageId: string) {
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const buffer = await convertHeicIfNeeded(fileBuffer)
    
    const filename = `${uuidv4()}.webp`

    await fs.mkdir(path.join(UPLOAD_DIR, 'thumbnails'), { recursive: true })
    await fs.mkdir(path.join(UPLOAD_DIR, 'medium'), { recursive: true })
    await fs.mkdir(path.join(UPLOAD_DIR, 'large'), { recursive: true })

    const [thumb, medium, large] = await Promise.all([
        sharp(buffer).resize(400).webp({ quality: 80 }).toBuffer(),
        sharp(buffer).resize(800).webp({ quality: 85 }).toBuffer(),
        sharp(buffer).resize(1600).webp({ quality: 90 }).toBuffer(),
    ])

    await Promise.all([
        fs.writeFile(path.join(UPLOAD_DIR, 'thumbnails', filename), thumb),
        fs.writeFile(path.join(UPLOAD_DIR, 'medium', filename), medium),
        fs.writeFile(path.join(UPLOAD_DIR, 'large', filename), large),
    ])

    const images = await getDb()
    const index = images.findIndex(img => img.id === imageId)
    
    if (index !== -1) {
        const oldImage = images[index]
        const filesToDelete = [oldImage.url, oldImage.thumbUrl, oldImage.mediumUrl, oldImage.largeUrl].filter(Boolean) as string[]
        for (const filePath of filesToDelete) {
            try {
                await fs.unlink(path.join(process.cwd(), 'public', filePath))
            } catch {
                console.warn(`Failed to delete old file: ${filePath}`)
            }
        }

        images[index] = {
            ...oldImage,
            url: `/uploads/large/${filename}`,
            thumbUrl: `/uploads/thumbnails/${filename}`,
            mediumUrl: `/uploads/medium/${filename}`,
            largeUrl: `/uploads/large/${filename}`,
            alt: file.name,
            title: file.name,
        }
        await saveDb(images)
        return images[index]
    }

    return null
}

export async function getAllImages(): Promise<ImageRecord[]> {
    return getDb()
}

export async function updateImage(id: string, data: Partial<ImageRecord>) {
    const images = await getDb()
    const index = images.findIndex(img => img.id === id)
    if (index !== -1) {
        images[index] = { ...images[index], ...data }
        await saveDb(images)
        return images[index]
    }
    return null
}

export async function deleteImage(id: string) {
    const images = await getDb()
    const index = images.findIndex(img => img.id === id)
    if (index !== -1) {
        const image = images[index]
        const filesToDelete = [image.url, image.thumbUrl, image.mediumUrl, image.largeUrl].filter(Boolean) as string[]
        for (const filePath of filesToDelete) {
            try {
                await fs.unlink(path.join(process.cwd(), 'public', filePath))
            } catch {
                console.warn(`Failed to delete file: ${filePath}`)
            }
        }
        images.splice(index, 1)
        await saveDb(images)
        return true
    }
    return false
}

export type SiteImageCategory = 
    | 'logo' 
    | 'hero' 
    | 'showcase1' 
    | 'showcase2' 
    | 'showcase3' 
    | 'showcase4' 
    | 'showcase5'
    | 'service1'
    | 'service2'
    | 'service3'
    | 'service4'
    | 'service5'
    | 'service6'

const PLACEHOLDER_PATHS: Record<string, string> = {
    'logo-placeholder': '/images/logo.png',
    'hero-placeholder': '/assets/showcase/hero_bg.jpg',
    'showcase1-placeholder': '/assets/showcase/photo1.jpg',
    'showcase2-placeholder': '/assets/showcase/photo2.jpg',
    'showcase3-placeholder': '/assets/showcase/photo3.jpg',
    'showcase4-placeholder': '/assets/showcase/photo4.jpg',
    'showcase5-placeholder': '/assets/showcase/photo5.jpg',
    'service1-placeholder': '/assets/showcase/photo1.jpg',
    'service2-placeholder': '/assets/showcase/photo2.jpg',
    'service3-placeholder': '/assets/showcase/photo3.jpg',
    'service4-placeholder': '/assets/showcase/photo4.jpg',
    'service5-placeholder': '/assets/showcase/photo5.jpg',
    'service6-placeholder': '/assets/showcase/photo1.jpg',
}

const SITE_IMAGES_FILE = path.join(process.cwd(), 'site-images.json')

interface SiteImageAssignment {
    category: SiteImageCategory
    imageId: string
    updatedAt: string
}

async function getSiteImagesDb(): Promise<SiteImageAssignment[]> {
    try {
        const data = await fs.readFile(SITE_IMAGES_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function saveSiteImagesDb(data: SiteImageAssignment[]) {
    await fs.writeFile(SITE_IMAGES_FILE, JSON.stringify(data, null, 2))
}

export async function getSiteImage(category: SiteImageCategory): Promise<ImageRecord | null> {
    const siteImages = await getSiteImagesDb()
    const assignment = siteImages.find(a => a.category === category)
    if (!assignment) return null
    
    if (assignment.imageId.endsWith('-placeholder')) {
        const originalPath = PLACEHOLDER_PATHS[assignment.imageId]
        if (originalPath) {
            return {
                id: assignment.imageId,
                url: originalPath,
                thumbUrl: originalPath,
                mediumUrl: originalPath,
                largeUrl: originalPath,
                alt: category,
                title: category,
                category: null,
                tags: null,
                order: 0,
                createdAt: assignment.updatedAt
            }
        }
        return null
    }
    
    const images = await getDb()
    return images.find(img => img.id === assignment.imageId) || null
}

export async function setSiteImage(category: SiteImageCategory, imageId: string): Promise<boolean> {
    const isPlaceholder = imageId.endsWith('-placeholder')
    const placeholderPath = PLACEHOLDER_PATHS[imageId]
    
    if (!isPlaceholder) {
        const images = await getDb()
        const imageExists = images.some(img => img.id === imageId)
        if (!imageExists) return false
    }
    
    const siteImages = await getSiteImagesDb()
    const existingIndex = siteImages.findIndex(a => a.category === category)
    
    if (existingIndex !== -1) {
        siteImages[existingIndex] = { category, imageId, updatedAt: new Date().toISOString() }
    } else {
        siteImages.push({ category, imageId, updatedAt: new Date().toISOString() })
    }
    
    await saveSiteImagesDb(siteImages)
    return true
}

export async function getAllSiteImages(): Promise<{ category: SiteImageCategory; image: ImageRecord | null }[]> {
    const siteImages = await getSiteImagesDb()
    const images = await getDb()
    
    return siteImages.map(assignment => {
        if (assignment.imageId.endsWith('-placeholder')) {
            const originalPath = PLACEHOLDER_PATHS[assignment.imageId]
            if (originalPath) {
                return {
                    category: assignment.category,
                    image: {
                        id: assignment.imageId,
                        url: originalPath,
                        thumbUrl: originalPath,
                        mediumUrl: originalPath,
                        largeUrl: originalPath,
                        alt: assignment.category,
                        title: assignment.category,
                        category: null,
                        tags: null,
                        order: 0,
                        createdAt: assignment.updatedAt
                    } as ImageRecord
                }
            }
        }
        return {
            category: assignment.category,
            image: images.find(img => img.id === assignment.imageId) || null
        }
    })
}
