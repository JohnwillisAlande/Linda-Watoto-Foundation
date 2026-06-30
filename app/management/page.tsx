"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imagePath: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Jane Doe",
    role: "Founder & Executive Director",
    bio: "Dedicated to creating sustainable support systems for children across the region.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m2",
    name: "John Smith",
    role: "Operations Manager",
    bio: "Coordinates logistics for all community hangouts and home visits.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m3",
    name: "Sarah Johnson",
    role: "Volunteer Coordinator",
    bio: "Manages volunteer onboarding, membership engagement, and event teams.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m4",
    name: "Michael Kamau",
    role: "Finance Director",
    bio: "Ensures all donations and foundation funds are managed with 100% transparency.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m5",
    name: "Esther Wanjiru",
    role: "Mentorship Lead",
    bio: "Develops the educational and emotional support frameworks for our visits.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m6",
    name: "David Ochieng",
    role: "Partnerships Director",
    bio: "Bridges the gap between corporate sponsors and grassroots foundation needs.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "m7",
    name: "Grace Mutuku",
    role: "Media & Communications",
    bio: "Captures the beautiful moments of our visits and manages our public presence.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
];

export default function ManagementPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden py-20 relative">
      
      {/* Decorative Background Glow (Adjusted for light theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
            Our Leadership Team
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet the dedicated individuals working behind the scenes to ensure the Linda Watoto Foundation fulfills its promise.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-[500px] md:h-[600px] w-full max-w-6xl mx-auto flex items-center justify-center perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {teamMembers.map((member, index) => {
            let offset = index - activeIndex;
            if (offset > 3) offset -= 7;
            if (offset < -3) offset += 7;

            const isActive = offset === 0;
            const isFlank1 = Math.abs(offset) === 1;
            const isFlank2 = Math.abs(offset) === 2;

            let translateX = offset * 110; 
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;
            let blur = "blur-none";

            if (!isActive) {
              scale = isFlank1 ? 0.8 : isFlank2 ? 0.6 : 0.4;
              zIndex = 30 - Math.abs(offset) * 10;
              opacity = isFlank1 ? 0.8 : isFlank2 ? 0.4 : 0;
              blur = isFlank1 ? "blur-[2px]" : "blur-[4px]";
              translateX = offset > 0 ? (offset * 80) + 20 : (offset * 80) - 20; 
            }

            return (
              <div
                key={member.id}
                className={`absolute w-[280px] md:w-[350px] h-[400px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] bg-white shadow-2xl border border-slate-200`}
                style={{
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Image Background */}
                <Image
                  src={member.imagePath}
                  alt={member.name}
                  fill
                  className={`object-cover transition-all duration-700 ${!isActive ? 'grayscale opacity-70' : 'grayscale-0 opacity-100'}`}
                />
                
                {/* Dark Gradient Overlay for text readability ON the image */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`} />

                {/* Card Content (Only visible on active card) */}
                <div className={`absolute bottom-0 left-0 w-full p-6 text-center transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
                  <p className="text-sm font-bold text-blue-300 mb-3 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls (Updated for light theme) */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center text-slate-600 hover:text-white transition-all shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          {/* Progress Indicators */}
          <div className="flex gap-2">
            {teamMembers.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center text-slate-600 hover:text-white transition-all shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </div>
    </main>
  );
}