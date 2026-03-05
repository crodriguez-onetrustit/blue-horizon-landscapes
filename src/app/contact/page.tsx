'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/ui/PageHero'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    service: z.string().min(1, 'Please select a service'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('Form data:', data)
        setIsSubmitting(false)
        setIsSuccess(true)
        reset()
    }

    return (
        <div className="bg-gray-50">
            <PageHero
                title="Let's Build Your Horizon"
                subtitle="Contact Blue Horizon Landscapes today for a free, no-obligation estimate on your next project."
                siteImageCategory="showcase3"
                showCTAs={true}
            />

            <div className="container mx-auto px-4 md:px-8 pt-24 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Info Side */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Phone */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary shrink-0">
                                <Phone size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary uppercase tracking-widest text-xs mb-1">Call Anytime</h3>
                                <a href="tel:9147558141" className="text-lg sm:text-2xl font-black text-secondary hover:text-secondary-dark transition-colors break-all">(914) 755-8141</a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary shrink-0">
                                <Mail size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-1">Email Us</h3>
                                <p className="text-lg sm:text-2xl font-black text-primary break-all">contact@bluehorizonlandscapes.com</p>
                            </div>
                        </div>

                        {/* Service Area */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary shrink-0">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-1">Service Area</h3>
                                <p className="text-lg sm:text-2xl font-black text-primary leading-tight break-word">Orange County, NY & Surrounding Areas</p>
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-primary p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] text-white border border-white/10">
                            <div className="flex items-center space-x-3 mb-3">
                                <Clock size={20} className="text-secondary-light" />
                                <span className="font-bold tracking-widest uppercase text-xs sm:text-sm">Working Hours</span>
                            </div>
                            <p className="text-2xl sm:text-4xl font-black italic">Open 24 Hours</p>
                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center space-x-2">
                                {[...Array(5)].map((_, i) => <span key={i} className="text-accent text-sm sm:text-xl">★</span>)}
                                <span className="ml-2 text-xs sm:text-base font-bold opacity-70 text-secondary-light">5.0 Google Rated</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="relative">
                        {isSuccess ? (
                            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 text-center space-y-6 animate-in zoom-in-95 duration-500">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mx-auto">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-extrabold text-primary">Message Received!</h2>
                                <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                                    Thank you for reaching out. We've received your request and will get back to you shortly to schedule your free estimate.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-secondary text-white px-8 py-4 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-gray-100 space-y-5 md:space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-gray-500 ml-1">Your Name</label>
                                        <input
                                            {...register('name')}
                                            placeholder="John Doe"
                                            className={cn(
                                                "w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-secondary transition-all outline-none font-medium text-sm md:text-base",
                                                errors.name && "border-red-400 focus:border-red-400"
                                            )}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs font-bold pl-1">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-gray-500 ml-1">Email Address</label>
                                        <input
                                            {...register('email')}
                                            placeholder="john@example.com"
                                            className={cn(
                                                "w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-secondary transition-all outline-none font-medium text-sm md:text-base",
                                                errors.email && "border-red-400 focus:border-red-400"
                                            )}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs font-bold pl-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-gray-500 ml-1">Phone Number</label>
                                        <input
                                            {...register('phone')}
                                            placeholder="(914) 000-0000"
                                            className={cn(
                                                "w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-secondary transition-all outline-none font-medium text-sm md:text-base",
                                                errors.phone && "border-red-400 focus:border-red-400"
                                            )}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs font-bold pl-1">{errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-gray-500 ml-1">Service Interested In</label>
                                        <select
                                            {...register('service')}
                                            className={cn(
                                                "w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-secondary transition-all outline-none font-medium text-sm md:text-base",
                                                errors.service && "border-red-400 focus:border-red-400"
                                            )}
                                        >
                                            <option value="">Select a service...</option>
                                            <option value="lawn">Lawn Maintenance</option>
                                            <option value="hardscape">Hardscaping</option>
                                            <option value="cleanup">Property Cleanup</option>
                                            <option value="planting">Planting & Garden</option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                        {errors.service && <p className="text-red-500 text-xs font-bold pl-1">{errors.service.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-gray-500 ml-1">Your Message</label>
                                    <textarea
                                        {...register('message')}
                                        rows={3}
                                        placeholder="Tell us about your project or questions..."
                                        className={cn(
                                            "w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-secondary transition-all outline-none font-medium resize-none text-sm md:text-base",
                                            errors.message && "border-red-400 focus:border-red-400"
                                        )}
                                    />
                                    {errors.message && <p className="text-red-500 text-xs font-bold pl-1">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center space-x-2 md:space-x-3 bg-primary text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-bold md:font-black text-base md:text-xl hover:bg-primary-dark transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Background Accent */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}
