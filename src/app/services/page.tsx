'use client'

import {
    Scissors,
    Shovel,
    Leaf,
    Trees,
    Droplets,
    Snowflake,
    Hammer,
    Zap,
    CheckCircle2,
    Trash2,
    Mountain
} from "lucide-react";
import { ServiceCard } from "@/components/home/ServiceCard";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

const allServices = [
    {
        title: "Lawn Maintenance",
        description: "Our signature lawn care includes precision mowing, string trimming, edging, and thorough debris blowing. We offer weekly and bi-weekly schedules to keep your turf healthy and striped to perfection.",
        icon: Scissors,
        image: "/assets/showcase/photo1.jpg",
        siteCategory: 'service1'
    },
    {
        title: "Hardscaping & Masonry",
        description: "Transform your yard into a living space. We design and install custom patios, walkways, retaining walls, and fire pits using natural stone and high-quality pavers.",
        icon: Shovel,
        image: "/assets/showcase/photo2.jpg",
        siteCategory: 'service2'
    },
    {
        title: "Mulching & Property Cleanup",
        description: "Keep your property sharp with fresh mulch, bed edging, and seasonal cleanups. We remove leaves, branches, and debris to prepare your landscape for every season.",
        icon: Trash2,
        image: "/assets/showcase/photo3.jpg",
        siteCategory: 'service3'
    },
    {
        title: "Planting & Garden Design",
        description: "From privacy screening with evergreens to vibrant perennial gardens, we help select and install the perfect plants for your soil and sunlight conditions.",
        icon: Leaf,
        image: "/assets/showcase/photo5.jpg",
        siteCategory: 'service4'
    },
    {
        title: "Tree & Shrub Care",
        description: "Expert pruning and trimming to maintain the health and shape of your ornamental trees and shrubs. We ensure your plants thrive and look their best.",
        icon: Trees,
        image: "/assets/showcase/photo4.jpg",
        siteCategory: 'service5'
    },
    {
        title: "Plowing & Snow Removal",
        description: "Keep your property safe and accessible all winter. We provide reliable snow plowing for driveways, parking lots, and walkways with 24/7 availability during storm events.",
        icon: Snowflake,
        image: "/uploads/large/9527a1aa-a97b-4b32-83bf-0683a641a259.webp",
        siteCategory: 'service6'
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-white">
            <PageHero
                title="Expert Services for Every Season"
                subtitle="Whether you're looking for routine maintenance or a total landscape transformation, Blue Horizon Landscapes LLC brings precision and passion to every property."
                siteImageCategory="service3"
                showRating={true}
                showCTAs={true}
            />

            {/* Services Grid */}
            <section className="container mx-auto px-4 md:px-8 mb-24 pt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allServices.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>

            {/* The Process */}
            <section className="bg-primary py-24 text-white overflow-hidden relative">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How We Work</h2>
                        <p className="text-gray-400 max-w-xl mx-auto font-mediumital">Our streamlined process ensures your project is completed with zero stress and maximum quality.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-white/10 hidden md:block" />

                        {[
                            { step: '01', title: 'Consultation', desc: 'We visit your property to understand your goals and provide a detailed estimate.' },
                            { step: '02', title: 'Planning', desc: 'We select the best materials and schedule the project at your convenience.' },
                            { step: '03', title: 'Execution', desc: 'Our skilled team performs the work with precision and heavy-grade equipment.' },
                            { step: '04', title: 'Final Review', desc: 'We walk through the finished project with you to ensure 100% satisfaction.' }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 text-center group">
                                <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 md:px-8 mt-24 mb-24">
                <div className="bg-secondary rounded-[3rem] p-12 md:p-16 lg:p-20 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative gap-8">
                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">Ready to start your project?</h2>
                        <p className="text-lg md:text-xl text-white/80 font-medium">Join 100+ satisfied clients in Orange County who trust Blue Horizon for their outdoor needs.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="relative z-10 bg-white text-secondary px-8 py-5 md:px-10 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                    >
                        Get a Free Quote
                    </Link>
                    <CheckCircle2 size={300} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none" />
                </div>
            </section>
        </div>
    )
}
