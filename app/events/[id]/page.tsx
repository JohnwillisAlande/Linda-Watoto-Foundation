"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  event_timestamp?: string;
}

export default function EventDetailsPage() {
  const { id } = useParams(); // Grabs the ID right from the URL
  const [event, setEvent] = useState<FoundationEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single(); // Tells Supabase we only expect one exact match

      if (data) {
        setEvent(data);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading event details...</p>
      </main>
    );
  }

  // ==========================================
  // 404 NOT FOUND STATE
  // ==========================================
  if (!event) {
    return (
      <main className="min-h-screen bg-slate-50 py-20 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center max-w-lg w-full">
          <div className="text-6xl mb-6">🏜️</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Event Not Found</h1>
          <p className="text-slate-600 mb-8">We could not find the event you are looking for. It may have been removed or the link might be broken.</p>
          <Link href="/events" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            Back to All Events
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // SUCCESS STATE
  // ==========================================
  
  // Format the date beautifully if we have the timestamp
  const eventDateObj = event.event_timestamp ? new Date(event.event_timestamp) : null;
  const fullDateString = eventDateObj && !isNaN(eventDateObj.getTime())
    ? eventDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : `${event.month} ${event.date}`;

  return (
    <main className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Navigation & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link href="/events" className="text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-2 transition-colors">
            <span aria-hidden="true">&larr;</span> Back to all events
          </Link>

          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
          >
            {copied ? (
              <><span className="text-green-500">✓</span> Link Copied!</>
            ) : (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> Share Event</>
            )}
          </button>
        </div>

        {/* Main Event Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Poster Image */}
          <div className="relative w-full md:w-1/2 lg:w-5/12 min-h-[300px] md:min-h-[500px] bg-slate-100 flex-shrink-0">
            <Image 
              src={event.image_url} 
              alt={`${event.title} Poster`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          </div>

          {/* Right Column: Details */}
          <div className="p-8 md:p-12 flex flex-col w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="space-y-4 mb-8 border-y border-slate-100 py-6">
              
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 text-xl">
                  📅
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-semibold text-slate-900">{fullDateString}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500 text-xl">
                  ⏰
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time</p>
                  <p className="font-semibold text-slate-900">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500 text-xl">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="font-semibold text-slate-900">{event.location}</p>
                </div>
              </div>

            </div>

            <div className="mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-3">About this Event</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/join-us"
                className="text-center px-6 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                RSVP to Attend
              </Link>
              <Link 
                href="/donations"
                className="text-center px-6 py-4 bg-slate-50 text-slate-700 border border-slate-200 text-lg font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Support this Drive
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}