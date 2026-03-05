'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Search, Grid, List as ListIcon, Trash2, Edit3, Eye, Replace, AlertTriangle, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageInfo {
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
    project?: { id: string; title: string; category: string } | null
}

interface UsageItem {
    type: string
    id: string
    title: string
    location: string
}

export default function MediaLibraryPage() {
    const [images, setImages] = useState<ImageInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showUsageModal, setShowUsageModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showReplaceModal, setShowReplaceModal] = useState(false)
    const [usage, setUsage] = useState<UsageItem[]>([])
    const [editing, setEditing] = useState({ alt: '', title: '', category: '', tags: '' })
    const [deleting, setDeleting] = useState(false)
    const [replacingFile, setReplacingFile] = useState<File | null>(null)
    const [replacing, setReplacing] = useState(false)

    const fetchImages = useCallback(async () => {
        const res = await fetch('/api/admin/media')
        const data = await res.json()
        setImages(data.images || [])
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    const onDrop = async (acceptedFiles: File[]) => {
        setUploading(true)
        const formData = new FormData()
        acceptedFiles.forEach(file => formData.append('files', file))

        try {
            const res = await fetch('/api/admin/media/upload', {
                method: 'POST',
                body: formData,
            })
            if (res.ok) fetchImages()
        } catch (error) {
            console.error('Upload failed', error)
        } finally {
            setUploading(false)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.heic', '.HEIC'] }
    })

    const handleEditClick = (image: ImageInfo) => {
        setSelectedImage(image)
        setEditing({
            alt: image.alt || '',
            title: image.title || '',
            category: image.category || '',
            tags: image.tags || ''
        })
        setShowEditModal(true)
    }

    const handleSaveEdit = async () => {
        if (!selectedImage) return

        const res = await fetch('/api/admin/media', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedImage.id,
                ...editing
            })
        })

        if (res.ok) {
            setShowEditModal(false)
            fetchImages()
        }
    }

    const handleViewUsage = async (image: ImageInfo) => {
        setSelectedImage(image)
        const res = await fetch(`/api/admin/media/usage?id=${image.id}`)
        const data = await res.json()
        setUsage(data.usage || [])
        setShowUsageModal(true)
    }

    const handleDeleteClick = (image: ImageInfo) => {
        setSelectedImage(image)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedImage) return
        setDeleting(true)

        try {
            const res = await fetch(`/api/admin/media?id=${selectedImage.id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setShowDeleteModal(false)
                fetchImages()
            }
        } catch (error) {
            console.error('Delete failed', error)
        } finally {
            setDeleting(false)
        }
    }

    const handleReplaceClick = (image: ImageInfo) => {
        setSelectedImage(image)
        setShowReplaceModal(true)
    }

    const handleReplace = async () => {
        if (!selectedImage || !replacingFile) return
        setReplacing(true)

        const formData = new FormData()
        formData.append('files', replacingFile)
        formData.append('imageId', selectedImage.id)

        try {
            const res = await fetch('/api/admin/media/upload', {
                method: 'POST',
                body: formData,
            })
            if (res.ok) {
                setShowReplaceModal(false)
                setReplacingFile(null)
                fetchImages()
            }
        } catch (error) {
            console.error('Replace failed', error)
        } finally {
            setReplacing(false)
        }
    }

    const filteredImages = images.filter(img => {
        const query = searchQuery.toLowerCase()
        return (img.title?.toLowerCase().includes(query) || false) ||
               (img.alt?.toLowerCase().includes(query) || false) ||
               (img.category?.toLowerCase().includes(query) || false) ||
               (img.tags?.toLowerCase().includes(query) || false)
    })

    return (
        <div className="space-y-8">
            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Image">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={editing.title}
                            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                        <input
                            type="text"
                            value={editing.alt}
                            onChange={(e) => setEditing({ ...editing, alt: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            value={editing.category}
                            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                            placeholder="e.g., hero, gallery, service"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <input
                            type="text"
                            value={editing.tags}
                            onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                            placeholder="e.g., landscape, garden, patio"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button onClick={handleSaveEdit} className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">Save Changes</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showUsageModal} onClose={() => setShowUsageModal(false)} title="Image Usage">
                <div className="space-y-4">
                    {usage.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">This image is not currently used anywhere.</p>
                    ) : (
                        <div className="space-y-2">
                            {usage.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-800">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.location}</p>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded">{item.type}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end pt-4">
                        <button onClick={() => setShowUsageModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Image">
                <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                        <AlertTriangle className="text-red-500 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium text-red-800">Are you sure you want to delete this image?</p>
                            <p className="text-sm text-red-600 mt-1">This action cannot be undone.</p>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="flex items-center space-x-3">
                            <img loading="lazy" src={selectedImage.thumbUrl || selectedImage.url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                            <div>
                                <p className="font-medium">{selectedImage.title || 'Untitled'}</p>
                                <p className="text-sm text-gray-500">{selectedImage.category || 'Uncategorized'}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button onClick={handleConfirmDelete} disabled={deleting} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">
                            {deleting ? 'Deleting...' : 'Delete Image'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showReplaceModal} onClose={() => { setShowReplaceModal(false); setReplacingFile(null) }} title="Replace Image">
                <div className="space-y-4">
                    {selectedImage && (
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <img loading="lazy" src={selectedImage.thumbUrl || selectedImage.url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                            <div>
                                <p className="font-medium">Current Image</p>
                                <p className="text-sm text-gray-500">{selectedImage.title || 'Untitled'}</p>
                            </div>
                        </div>
                    )}
                    <div {...getRootProps()} className={cn("border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all", isDragActive ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-gray-300")}>
                        <input {...getInputProps()} onChange={(e: any) => setReplacingFile(e.target.files?.[0] || null)} />
                        {replacingFile ? (
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-secondary font-medium">{replacingFile.name}</span>
                                <button onClick={(e: any) => { e.stopPropagation(); setReplacingFile(null) }}><X size={16} /></button>
                            </div>
                        ) : (
                            <div>
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-gray-600">Drop a new image here, or click to select</p>
                                <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP supported</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button onClick={() => { setShowReplaceModal(false); setReplacingFile(null) }} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button onClick={handleReplace} disabled={!replacingFile || replacing} className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50">
                            {replacing ? 'Replacing...' : 'Replace Image'}
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, alt, category, tags, or project..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{filteredImages.length} images</span>
                </div>
            </div>

            <div {...getRootProps()} className={cn("border-4 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer", isDragActive ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-gray-300", uploading && "opacity-50 pointer-events-none")}>
                <input {...getInputProps()} />
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Upload size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{uploading ? 'Processing files...' : 'Drag & drop images here'}</h3>
                <p className="text-gray-500">Supported formats: JPG, PNG, WebP (up to 10MB each)</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">Media Library Instructions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li><strong>Upload:</strong> Drag & drop images or click the box to select files</li>
                    <li><strong>Edit:</strong> Click the edit icon to change title, alt text, category, and tags</li>
                    <li><strong>Replace:</strong> Click replace icon to swap an image while keeping its metadata</li>
                    <li><strong>Delete:</strong> Click trash icon to remove an image (cannot be undone)</li>
                    <li><strong>Search:</strong> Use the search bar to find images by title, category, or tags</li>
                </ul>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No images found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                            <img loading="lazy" src={img.thumbUrl || img.url} alt={img.alt || img.title || 'Image'} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button onClick={() => handleViewUsage(img)} className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100" title="View Usage"><Link2 size={18} /></button>
                                <button onClick={() => handleEditClick(img)} className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100" title="Edit"><Edit3 size={18} /></button>
                                <button onClick={() => handleReplaceClick(img)} className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100" title="Replace"><Replace size={18} /></button>
                                <button onClick={() => handleDeleteClick(img)} className="p-2 bg-white text-red-500 rounded-lg hover:bg-gray-100" title="Delete"><Trash2 size={18} /></button>
                            </div>
                            {img.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                    <p className="text-white text-xs truncate">{img.title}</p>
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                {img.category && <span className="px-2 py-0.5 text-xs bg-black/40 backdrop-blur-md text-white rounded-full">{img.category}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}
