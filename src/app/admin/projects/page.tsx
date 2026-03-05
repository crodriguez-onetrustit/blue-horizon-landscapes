'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
    id: string
    title: string
    category: string
    beforeImage: string
    afterImage: string
    description: string
    order: number
    createdAt: string
}

interface Image {
    id: string
    url: string
    thumbUrl: string
    mediumUrl: string | null
    largeUrl: string | null
    alt: string | null
    title: string | null
}

const CATEGORIES = ['Hardscaping', 'Lawn Care', 'Planting', 'Maintenance', 'Other']

export default function ProjectsManagementPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [allImages, setAllImages] = useState<Image[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [showGallery, setShowGallery] = useState<'before' | 'after' | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Hardscaping',
        beforeImage: '/assets/showcase/photo1.jpg',
        afterImage: '/assets/showcase/photo2.jpg',
        description: ''
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const fetchData = async () => {
        try {
            const [projectsRes, mediaRes] = await Promise.all([
                fetch('/api/admin/projects'),
                fetch('/api/admin/media')
            ])
            const projectsData = await projectsRes.json()
            const mediaData = await mediaRes.json()
            setProjects(projectsData.projects || [])
            setAllImages(mediaData.images || [])
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingProject(project)
            setFormData({
                title: project.title,
                category: project.category,
                beforeImage: project.beforeImage,
                afterImage: project.afterImage,
                description: project.description
            })
        } else {
            setEditingProject(null)
            setFormData({
                title: '',
                category: 'Hardscaping',
                beforeImage: '/assets/showcase/photo1.jpg',
                afterImage: '/assets/showcase/photo2.jpg',
                description: ''
            })
        }
        setShowModal(true)
        setMessage(null)
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage(null)

        try {
            const url = editingProject
                ? '/api/admin/projects'
                : '/api/admin/projects'
            const method = editingProject ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProject
                    ? { id: editingProject.id, ...formData }
                    : formData
                )
            })

            const data = await res.json()

            if (data.success) {
                setMessage({ type: 'success', text: `Project ${editingProject ? 'updated' : 'created'}!` })
                setShowModal(false)
                fetchData()
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save project' })
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
            if (res.ok) {
                fetchData()
            }
        } catch (error) {
            console.error('Failed to delete:', error)
        }
    }

    const handleSelectImage = (image: Image) => {
        const imageUrl = image.largeUrl || image.mediumUrl || image.url
        if (showGallery === 'before') {
            setFormData({ ...formData, beforeImage: imageUrl })
        } else if (showGallery === 'after') {
            setFormData({ ...formData, afterImage: imageUrl })
        }
        setShowGallery(null)
    }

    const getImagePreview = (url: string) => {
        if (url.startsWith('/uploads/')) {
            return url.replace('/large/', '/medium/').replace('.webp', '_thumb.webp')
        }
        return url
    }

    return (
        <div className="space-y-6">
            {message && (
                <div className={cn(
                    "p-4 rounded-lg flex items-center gap-2",
                    message.type === 'success' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                    {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
                    {message.text}
                </div>
            )}

            <div className="flex justify-between items-center">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add New Project</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Before</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">After</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Project</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Category</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-16 w-24 bg-gray-100 rounded" /></td>
                                    <td className="px-6 py-4"><div className="h-16 w-24 bg-gray-100 rounded" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                                    <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : projects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No projects found. Add your first project to get started.
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="h-16 w-24 rounded-lg overflow-hidden bg-gray-100">
                                            <img loading="lazy" src={getImagePreview(project.beforeImage)} alt="Before" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-16 w-24 rounded-lg overflow-hidden bg-gray-100">
                                            <img loading="lazy" src={getImagePreview(project.afterImage)} alt="After" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">{project.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">{project.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(project)}
                                                className="p-2 text-gray-400 hover:text-secondary transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Before Image */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Before Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="h-32 w-48 rounded-lg overflow-hidden bg-gray-100">
                                        <img loading="lazy" src={getImagePreview(formData.beforeImage)} alt="Before" className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        onClick={() => setShowGallery('before')}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <ImageIcon size={18} />
                                        <span>Choose Image</span>
                                    </button>
                                </div>
                            </div>

                            {/* After Image */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">After Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="h-32 w-48 rounded-lg overflow-hidden bg-gray-100">
                                        <img loading="lazy" src={getImagePreview(formData.afterImage)} alt="After" className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        onClick={() => setShowGallery('after')}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <ImageIcon size={18} />
                                        <span>Choose Image</span>
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                                    placeholder="e.g., Modern Patio & Walkway"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none h-32 resize-none"
                                    placeholder="Describe the project..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.title || !formData.description}
                                className="px-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-dark transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Gallery Modal */}
            {showGallery && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Select {showGallery === 'before' ? 'Before' : 'After'} Image</h2>
                            <button onClick={() => setShowGallery(null)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                {allImages.map(image => (
                                    <button
                                        key={image.id}
                                        onClick={() => handleSelectImage(image)}
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
