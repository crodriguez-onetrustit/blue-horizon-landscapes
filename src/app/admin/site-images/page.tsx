'use client'

import { useState, useEffect } from 'react'
import { Upload, Image as ImageIcon, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SiteImage {
    category: string
    image: {
        id: string
        url: string
        thumbUrl: string
        alt: string | null
        title: string | null
    } | null
}

interface Image {
    id: string
    url: string
    thumbUrl: string
    alt: string | null
    title: string | null
}

const CATEGORIES = [
    { key: 'logo', label: 'Logo', description: 'Main logo displayed in header and footer' },
    { key: 'hero', label: 'Hero Background', description: 'Main hero section background image' },
    { key: 'showcase1', label: 'Showcase Photo 1', description: 'Featured project photo on homepage' },
    { key: 'showcase2', label: 'Showcase Photo 2', description: 'Featured project photo on homepage' },
    { key: 'showcase3', label: 'Showcase Photo 3', description: 'Featured project photo on homepage' },
    { key: 'showcase4', label: 'Showcase Photo 4', description: 'Featured project photo on homepage' },
    { key: 'showcase5', label: 'Showcase Photo 5', description: 'Featured project photo on homepage' },
    { key: 'service1', label: 'Service Image 1', description: 'Hardscaping services page image' },
    { key: 'service2', label: 'Service Image 2', description: 'Softcaping services page image' },
    { key: 'service3', label: 'Service Image 3', description: 'Lighting services page image' },
    { key: 'service4', label: 'Service Image 4', description: 'Maintenance services page image' },
    { key: 'service5', label: 'Service Image 5', description: 'Patios services page image' },
    { key: 'service6', label: 'Service Image 6', description: 'Outdoor kitchen services page image' },
]

export default function SiteImagesPage() {
    const [siteImages, setSiteImages] = useState<SiteImage[]>([])
    const [allImages, setAllImages] = useState<Image[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState<string | null>(null)
    const [showGallery, setShowGallery] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [siteRes, mediaRes] = await Promise.all([
                fetch('/api/admin/site-images'),
                fetch('/api/admin/media')
            ])
            
            const siteData = await siteRes.json()
            const mediaData = await mediaRes.json()
            
            setSiteImages(siteData.siteImages || [])
            setAllImages(mediaData.images || [])
        } catch (error) {
            console.error('Error fetching data:', error)
            setMessage({ type: 'error', text: 'Failed to load images' })
        } finally {
            setLoading(false)
        }
    }

    async function handleUpload(category: string, file: File) {
        setUploading(category)
        setMessage(null)
        
        try {
            const formData = new FormData()
            formData.append('files', file)
            
            const res = await fetch('/api/admin/media/upload', {
                method: 'POST',
                body: formData
            })
            
            const data = await res.json()
            
            if (data.success && data.images?.[0]) {
                const imageId = data.images[0].id
                
                const updateRes = await fetch('/api/admin/site-images', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category, imageId })
                })
                
                const updateData = await updateRes.json()
                
                if (updateData.success) {
                    setMessage({ type: 'success', text: `${CATEGORIES.find(c => c.key === category)?.label} updated!` })
                    fetchData()
                } else {
                    setMessage({ type: 'error', text: 'Failed to assign image to category' })
                }
            } else {
                setMessage({ type: 'error', text: 'Upload failed' })
            }
        } catch (error) {
            console.error('Upload error:', error)
            setMessage({ type: 'error', text: 'Upload failed' })
        } finally {
            setUploading(null)
        }
    }

    async function handleSelectImage(category: string, imageId: string) {
        setMessage(null)
        
        try {
            const res = await fetch('/api/admin/site-images', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, imageId })
            })
            
            const data = await res.json()
            
            if (data.success) {
                setMessage({ type: 'success', text: `${CATEGORIES.find(c => c.key === category)?.label} updated!` })
                setShowGallery(null)
                fetchData()
            } else {
                setMessage({ type: 'error', text: 'Failed to update image' })
            }
        } catch (error) {
            console.error('Update error:', error)
            setMessage({ type: 'error', text: 'Failed to update image' })
        }
    }

    function getCurrentImage(category: string): Image | null {
        const siteImage = siteImages.find(s => s.category === category)
        return siteImage?.image as Image | null
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Site Images</h1>
            <p className="text-gray-600 mb-8">Manage all images used throughout the website</p>

            {message && (
                <div className={cn(
                    "mb-6 p-4 rounded-lg flex items-center gap-2",
                    message.type === 'success' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                    {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map(category => {
                    const currentImage = getCurrentImage(category.key)
                    
                    return (
                        <div key={category.key} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                            <div className="p-4 border-b bg-gray-50">
                                <h3 className="font-semibold text-primary">{category.label}</h3>
                                <p className="text-sm text-gray-500">{category.description}</p>
                            </div>
                            
                            <div className="aspect-video bg-gray-100 relative">
                                {currentImage ? (
                                    <img loading="lazy" 
                                        src={currentImage.thumbUrl || currentImage.url} 
                                        alt={currentImage.alt || category.label}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4 flex gap-2">
                                <label className="flex-1 cursor-pointer bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2">
                                    <Upload size={16} />
                                    Upload New
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleUpload(category.key, file)
                                        }}
                                    />
                                </label>
                                <button 
                                    onClick={() => setShowGallery(category.key)}
                                    className="flex-1 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-dark transition flex items-center justify-center gap-2"
                                >
                                    <ImageIcon size={16} />
                                    Gallery
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showGallery && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Select Image for {CATEGORIES.find(c => c.key === showGallery)?.label}</h2>
                            <button onClick={() => setShowGallery(null)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {allImages.map(image => (
                                    <button
                                        key={image.id}
                                        onClick={() => handleSelectImage(showGallery, image.id)}
                                        className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition"
                                    >
                                        <img loading="lazy" 
                                            src={image.thumbUrl || image.url} 
                                            alt={image.alt || 'Image'}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
