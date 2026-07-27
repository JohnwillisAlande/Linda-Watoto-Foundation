"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  google_photos_url: string;
}

export default function AchievementsPage() {
  const [visits, setVisits] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        // Sort by the actual event date, descending (newest first)!
        .order("date", { ascending: false });

      if (data) {
        setVisits(data);
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  // Helper to format dates nicely for the public UI (e.g., "2025-11-01" -> "November 2025")
  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) { 
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return dateStr;
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Achievements & Visits</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Every milestone represents a community uplifted, a child empowered, and a memory cherished. Explore our past journeys.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-medium animate-pulse">
          Loading achievements...
        </div>
      ) : visits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500">No achievements recorded yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
              
              <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                {visit.image_url && (
                  <Image src={visit.image_url} alt={visit.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                )}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                  {formatFriendlyDate(visit.date)}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {visit.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {visit.description}
                </p>
                
                <a href={visit.google_photos_url} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 block flex items-center justify-center gap-2">
                  View on Google Photos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}