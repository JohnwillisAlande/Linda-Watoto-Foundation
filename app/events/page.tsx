"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Added 'imagePath' to accommodate the event posters
const events = [
  {
    id: "evt-1",
    title: "Mentorship & Games Hangout",
    location: "Makimei Children's Home, Kikuyu",
    date: "14",
    month: "AUG",
    time: "10:00 AM - 3:00 PM",
    description: "Join our core volunteer team for a day of outdoor games, talent showcases, and one-on-one mentorship with the children.",
    imagePath: "/assets/images/events/placeholder-1.jpg", // Replace with your actual poster image
  },
  {
    id: "evt-2",
    title: "Back-to-School Charity Drive",
    location: "Nairobi CBD (Central Drop-off)",
    date: "28",
    month: "AUG",
    time: "9:00 AM - 1:00 PM",
    description: "We are collecting textbooks, stationery, and backpacks to ensure every child is prepared for the new academic term.",
    imagePath: "/assets/images/events/placeholder-2.jpg", // Replace with your actual poster image
  }
];

export default function EventsPage() {
  // State to track which image is currently expanded in the full-screen modal
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just watch from the sidelines. Join us at our next community outreach, bring a friend, and be part of the change.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              
              {/* 1. Expandable Image Section (Left Aligned on Desktop) */}
              <div 
                className="relative w-full lg:w-2/5 xl:w-1/3 h-64 lg:h-auto cursor-zoom-in bg-slate-100 flex-shrink-0 overflow-hidden"
                onClick={() => setExpandedImage(event.imagePath)}
                title="Click to expand poster"
              >
                {/* Note: Until you add the images to your public folder, these might show as broken image icons */}
                <Image 
                  src={event.imagePath} 
                  alt={`${event.title} Poster`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                
                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-md transition-opacity duration-300 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Expand Poster
                  </span>
                </div>
              </div>

              {/* 2. Content Section (Right Aligned) */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 flex-grow">
                
                {/* Calendar Date Badge */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 border border-blue-100 rounded-2xl w-24 h-28 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-blue-100 text-blue-600">{event.month}</span>
                  <span className="text-5xl font-extrabold leading-none text-slate-900 group-hover:text-white">{event.date}</span>
                </div>

                {/* Event Details & Actions */}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                  
                  {/* Location & Time Info */}
                  <div className="flex flex-col xl:flex-row gap-3 mb-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                      <span className="text-red-500">📍</span> {event.location}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                      <span className="text-orange-500">⏰</span> {event.time}
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                    <Link 
                      href="/join-us"
                      className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      RSVP to Attend
                    </Link>
                    <Link 
                      href="/donations"
                      className="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Support this Drive
                    </Link>
                    
                    {/* The new Read More link */}
                    <Link 
                      href={`/events/${event.id}`}
                      className="ml-auto text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                    >
                      Read More <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Image Modal (Lightbox) */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
            aria-label="Close full screen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Constrained Image Container */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
            <Image 
              src={expandedImage} 
              alt="Expanded Event Poster" 
              fill 
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}

    </main>
  );
}