'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { X, Check, RotateCw, Trash2, Save } from 'lucide-react'

interface ImageEditorModalProps {
    image: {
        id: string
        url: string
        title: string
    }
    onClose: () => void
    onSave: (croppedImage: string) => void
}

export function ImageEditorModal({ image, onClose, onSave }: ImageEditorModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col">
            {/* Header */}
            <div className="h-20 bg-primary/50 text-white px-8 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center space-x-4">
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                        <X size={24} />
                    </button>
                    <h3 className="font-bold text-lg">Edit: {image.title}</h3>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-secondary text-white px-6 py-2 rounded-xl font-bold hover:bg-secondary-dark transition-all"
                        onClick={() => onSave('dummy-pixel-data')}
                    >
                        <Check size={20} />
                        <span>Apply Changes</span>
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-black/20">
                <Cropper
                    image={image.url}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
            </div>

            {/* Footer Controls */}
            <div className="h-32 bg-primary text-white px-8 flex items-center justify-center space-x-12">
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Zoom</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-48 accent-secondary"
                    />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Rotation</span>
                    <button
                        onClick={() => setRotation((r) => (r + 90) % 360)}
                        className="p-3 bg-white/10 rounded-xl hover:bg-secondary transition-all"
                    >
                        <RotateCw size={24} />
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Aspect Ratio</span>
                    <div className="flex space-x-2">
                        {['1:1', '4:3', '16:9', 'Free'].map(ratio => (
                            <button key={ratio} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10">{ratio}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
