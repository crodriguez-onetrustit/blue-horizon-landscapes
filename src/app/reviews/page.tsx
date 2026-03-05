'use client'

import React from 'react'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

const reviews = [
    {
        name: "Michael R.",
        date: "2 months ago",
        content: "Blue Horizon Landscapes transformed my backyard into an oasis! Their attention to detail on the patio was incredible. Highly recommend for any hardscaping work.",
        rating: 5,
        source: "Google"
    },
    {
        name: "Sarah T.",
        date: "1 month ago",
        content: "The best lawn service I've ever used. My lawn has never looked this green and the stripe work is perfect every time. Very reliable team.",
        rating: 5,
        source: "Google"
    },
    {
        name: "David L.",
        date: "3 weeks ago",
        content: "Professional, punctual, and hard working. They did a massive spring cleanup for us and it looks better than when we first moved in.",
        rating: 5,
        source: "Google"
    },
    {
        name: "John K.",
        date: "4 months ago",
        content: "Fair pricing and top-notch work. They installed a retaining wall that completely fixed our drainage issue and looks beautiful.",
        rating: 5,
        source: "Google"
    },
    {
        name: "Lisa M.",
        date: "2 weeks ago",
        content: "Excellent experience from start to finish. The owner is very hands-on and ensures everything is done right. 5 stars!",
        rating: 5,
        source: "Google"
    }
]

export default function ReviewsPage() {
    return (
        <div className="bg-white">
            <PageHero
                title="What Our Clients Say"
                subtitle="We take pride in 100% client satisfaction. Read what our customers have to say about their experience with Blue Horizon Landscapes."
                siteImageCategory="showcase4"
                showRating={true}
            />

            <div className="container mx-auto px-4 md:px-8 pt-24">
                {/* Rating Header */}
                <div className="max-w-4xl mb-20">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                        <div className="flex items-center space-x-2">
                            <div className="flex text-accent">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={32} />)}
                            </div>
                            <span className="text-4xl font-black text-secondary-light ml-2">5.0</span>
                        </div>
                        <p className="text-xl text-gray-600 font-medium">
                            Based on <span className="text-primary font-bold">19+ Google Reviews</span>
                        </p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <Quote className="text-secondary w-12 h-12 opacity-20" />
                                    <div className="flex text-accent">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                                    </div>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                                    "{review.content}"
                                </p>
                            </div>
                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-primary text-xl">{review.name}</h4>
                                    <p className="text-gray-400 text-sm">{review.date}</p>
                                </div>
                                <div className="bg-blue-50 px-3 py-1 rounded text-[10px] font-black uppercase text-blue-600 tracking-widest border border-blue-100 flex items-center">
                                    <CheckCircle2 size={12} className="mr-1" />
                                    {review.source} Verified
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-24 text-center">
                    <a
                        href="https://www.google.com/maps/place/Blue+horizon+landscapes+LLC/@41.5032082,-74.0423106,14z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                    >
                        <span>Read All Google Reviews</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-sm uppercase tracking-widest">Go →</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
