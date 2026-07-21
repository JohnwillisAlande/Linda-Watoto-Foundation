"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface FoundationEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  month: string;
  time: string;
  description: string;
  image_url: string;
}

// ----------------------------------------------------------------------
// NEW: Individual Event Card Component to handle independent countdowns
// ----------------------------------------------------------------------
function EventCard({ event, onExpand }: { event: FoundationEvent; onExpand: (url: string) => void }) {
  const [status, setStatus] = useState<"future" | "today" | "past">("future");
  const [countdownText, setCountdownText] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    // 1. Smart Date Parser (Strips 'st', 'nd', 'rd', 'th' just in case)
    const cleanDate = event.date.replace(/(st|nd|rd|th)/gi, '').trim();
    const currentYear = new Date().getFullYear();
    
    // Attempt to build a real date object
    let parsedDate = new Date(`${event.month} ${cleanDate} ${currentYear}`);

    // If the date is more than 30 days in the past, assume it is for NEXT year
    if (parsedDate < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
      parsedDate.setFullYear(currentYear + 1);
    }

    // 2. Set the Day of the Week (e.g., "Saturday")
    if (!isNaN(parsedDate.getTime())) {
      setDayOfWeek(parsedDate.toLocaleDateString('en-US', { weekday: 'long' }));
    }

    // 3. Countdown Logic
    const calculateTime = () => {
      if (isNaN(parsedDate.getTime())) return;

      const now = new Date();
      // Zero out the time so we are strictly comparing calendar days
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const eventDay = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()).getTime();

      const diffTime = eventDay - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        setStatus("today");
        setCountdownText("Happening Today!");
      } else if (diffDays < 0) {
        setStatus("past");
        setCountdownText("Event ended");
      } else {
        setStatus("future");
        setCountdownText(`${diffDays} day${diffDays > 1 ? 's' : ''} to go`);
      }
    };

    calculateTime();
    // Re-check every hour in case the user leaves the tab open overnight
    const timer = setInterval(calculateTime, 1000 * 60 * 60); 
    return () => clearInterval(timer);
  }, [event]);

  // Determine dynamic styling based on the event status
  const cardStyles = status === "today" 
    ? "bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row border-2 border-green-500 shadow-xl shadow-green-100 transition-all duration-300 group"
    : status === "past"
    ? "bg-slate-50 rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200 shadow-sm opacity-75 group"
    : "bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group";

  return (
    <div className={cardStyles}>
      
      {/* Expandable Image Section */}
      <div 
        className="relative w-full lg:w-2/5 xl:w-1/3 h-64 lg:h-auto cursor-zoom-in bg-slate-200 flex-shrink-0 overflow-hidden"
        onClick={() => onExpand(event.image_url)}
        title="Click to expand poster"
      >
        <Image 
          src={event.image_url} 
          alt={`${event.title} Poster`} 
          fill 
          className={`object-cover transition-transform duration-700 ${status !== 'past' ? 'group-hover:scale-105' : ''} ${status === 'past' ? 'grayscale' : ''}`}
          sizes="(max-width: 1024px) 100vw, 33vw"
          unoptimized
        />
        
        {/* Animated Overlay for "Happening Today" */}
        {status === "today" && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            Live Today
          </div>
        )}

        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-md transition-opacity duration-300 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Expand Poster
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 flex-grow">
        
        {/* Calendar Date Badge */}
        <div className={`flex-shrink-0 flex flex-col items-center justify-center border rounded-2xl w-28 h-32 shadow-sm transition-colors duration-300 ${status === 'today' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white'}`}>
          <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${status === 'today' ? 'text-green-600' : 'group-hover:text-blue-100 text-blue-600'}`}>
            {event.month}
          </span>
          <span className={`text-5xl font-extrabold leading-none mb-1 ${status === 'today' ? 'text-green-700' : 'text-slate-900 group-hover:text-white'}`}>
            {event.date}
          </span>
          {/* Automatically calculated Day of the Week */}
          <span className={`text-xs font-semibold uppercase ${status === 'today' ? 'text-green-600' : 'text-slate-500 group-hover:text-blue-200'}`}>
            {dayOfWeek}
          </span>
        </div>

        {/* Event Details & Actions */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h2 className={`text-2xl font-bold transition-colors ${status === 'past' ? 'text-slate-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
              {event.title}
            </h2>
            
            {/* Dynamic Status Badge */}
            <span className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${
              status === 'today' ? 'bg-green-100 text-green-700 border-green-200' :
              status === 'past' ? 'bg-slate-200 text-slate-500 border-slate-300' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {countdownText}
            </span>
          </div>
          
          {/* Location & Time Info */}
          <div className="flex flex-col xl:flex-row gap-3 mb-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
              <span className={status === 'past' ? 'grayscale' : 'text-red-500'}>📍</span> {event.location}
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
              <span className={status === 'past' ? 'grayscale' : 'text-orange-500'}>⏰</span> {event.time}
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
            {event.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-slate-100">
            {status !== 'past' ? (
              <>
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
              </>
            ) : (
              <span className="text-sm font-medium text-slate-500 italic">Registration closed</span>
            )}
            
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
  );
}

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------
export default function EventsPage() {
  const [events, setEvents] = useState<FoundationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setEvents(data);
      setLoading(false);
    };

    fetchLiveEvents();
  }, []);

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

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium animate-pulse">
            Loading upcoming events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No upcoming events right now</h3>
            <p className="text-slate-500">We are currently planning our next drive. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onExpand={setExpandedImage} />
            ))}
          </div>
        )}

      </div>

      {/* Full-Screen Image Modal (Lightbox) */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
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
          
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
            <Image 
              src={expandedImage} 
              alt="Expanded Event Poster" 
              fill 
              className="object-contain"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        </div>
      )}
    </main>
  );
}