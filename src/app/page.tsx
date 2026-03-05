'use client'

import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { Leaf, Scissors, Shovel, Snowflake, Trees, Droplets } from "lucide-react";
import Link from "next/link";
import { useSiteImage } from "@/components/SiteImagesContext";

const featuredServices = [
  {
    title: "Lawn Maintenance",
    description: "Professional mowing, edging, and debris removal to keep your lawn in pristine condition year-round.",
    icon: Scissors,
    image: "/assets/showcase/photo1.jpg",
    siteCategory: 'service1'
  },
  {
    title: "Hardscaping",
    description: "Expert design and installation of patios, walkways, and retaining walls using premium materials.",
    icon: Shovel,
    image: "/assets/showcase/photo2.jpg",
    siteCategory: 'service2'
  },
  {
    title: "Mulching & Planting",
    description: "Enhance your garden beds with professional mulching and seasonal plant installation for maximum curb appeal.",
    icon: Leaf,
    image: "/assets/showcase/photo3.jpg",
    siteCategory: 'service3'
  }
];

export default function Home() {
  const { image: showcase4Image, loading: showcase4Loading } = useSiteImage('showcase4')
  
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Services Overview */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0 text-left">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Our Expertise</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                Comprehensive Outdoor Solutions <br className="hidden md:block" /> for Your Home
              </p>
            </div>
            <Link
              href="/services"
              className="group flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg"
            >
              <span>View All Services</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 italic">"We Make Places Beautiful"</h2>
          <div className="flex items-center justify-center space-x-12 opacity-80 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-secondary-light mb-1">19</p>
              <p className="text-xs uppercase tracking-widest font-bold">5-Star Reviews</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-secondary-light mb-1">100%</p>
              <p className="text-xs uppercase tracking-widest font-bold">Reliability</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-secondary-light mb-1">Local</p>
              <p className="text-xs uppercase tracking-widest font-bold">Orange County, NY</p>
            </div>
          </div>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 translate-x-1/2" />
      </section>

      {/* Featured Project Preview Hook */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-700">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                {showcase4Loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : showcase4Image ? (
                  <img loading="lazy"
                    src={showcase4Image.largeUrl || showcase4Image.url}
                    alt="Recent Project"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <img loading="lazy"
                    src="/assets/showcase/photo4.jpg"
                    alt="Recent Project"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <p className="text-sm font-bold uppercase tracking-widest mb-2 text-white/80">Latest Work</p>
                <h4 className="text-xl font-bold">Newburgh Residential Hardscaping</h4>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">Recent Work</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                Bringing Visions to Life, <br /> One Project at a Time
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From full property transformations to scheduled maintenance, we bring the same level of dedication and precision to every job. Explore our gallery to see how we've helped homeowners across Orange County transform their outdoor living spaces.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center space-x-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                <span>View Project Gallery</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
