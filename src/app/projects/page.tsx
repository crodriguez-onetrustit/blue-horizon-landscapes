'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { Filter, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/ui/PageHero'

interface Project {
    id: string
    title: string
    category: string
    beforeImage: string
    afterImage: string
    description: string
}

const categories = ['All', 'Hardscaping', 'Lawn Care', 'Planting', 'Maintenance']

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data.projects || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <div className="bg-white">
            <PageHero
                title="Our Transformations"
                subtitle="Seeing is believing. Explore our featured projects and witness the meticulous care we bring to every outdoor space."
                siteImageCategory="showcase2"
                showRating={true}
                showCTAs={true}
            />

            <section className="container mx-auto px-4 md:px-8 mb-16 pt-12">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 text-gray-500 mr-4 font-bold border-r border-gray-200 pr-6">
                        <Filter size={20} />
                        <span>Filter By:</span>
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full font-bold transition-all text-sm",
                                activeCategory === cat
                                    ? "bg-secondary text-white shadow-xl scale-105"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {loading ? (
                <section className="container mx-auto px-4 md:px-8 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-8" />
                                <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
                                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="container mx-auto px-4 md:px-8 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <BeforeAfterSlider
                                    beforeImage={project.beforeImage}
                                    afterImage={project.afterImage}
                                />
                                <div className="mt-8 space-y-4 px-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-secondary font-black uppercase tracking-widest text-xs">
                                            {project.category}
                                        </span>
                                        <div className="flex items-center space-x-1 text-accent">
                                            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-primary group-hover:text-secondary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="pt-4 flex items-center space-x-6">
                                        <button className="flex items-center space-x-2 text-primary font-bold hover:underline">
                                            <Maximize2 size={18} />
                                            <span>View Full Gallery</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Proof in the reviews Hook */}
            <section className="container mx-auto px-4 md:px-8 mt-24">
                <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-8">Ready for your transformation?</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                        Every project starts with a simple conversation. Let's discuss your vision and make it a reality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="bg-secondary text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">
                            Get Your Free Estimate
                        </Link>
                        <Link href="/reviews" className="bg-white border border-gray-200 text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all shadow-md">
                            Read Client Reviews
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
