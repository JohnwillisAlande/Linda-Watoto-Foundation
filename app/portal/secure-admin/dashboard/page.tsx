"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Define the shape of our Event data
interface FoundationEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  month: string;
  time: string;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<FoundationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 1. Define fetchEvents FIRST so it can be called safely
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setEvents(data);
    }
    setLoading(false);
  };

  // 2. Security Check & Fetch Data on Load
  useEffect(() => {
    const checkUserAndFetchData = async () => {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in? Kick them out to the login page
        router.push("/portal/secure-admin");
        return;
      }

      // If logged in, fetch the events
      fetchEvents();
    };

    checkUserAndFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // 3. Handle Adding a New Event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("events").insert([
      {
        title,
        location,
        date,
        month,
        time,
        description,
        image_url: imageUrl || "/assets/images/events/placeholder-1.jpg", // Fallback image
      },
    ]);

    if (error) {
      alert("Error adding event: " + error.message);
    } else {
      alert("Event successfully added!");
      // Reset form
      setTitle(""); setLocation(""); setDate(""); setMonth(""); setTime(""); setDescription(""); setImageUrl("");
      // Refresh the list
      fetchEvents();
    }
    
    setIsSubmitting(false);
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal/secure-admin");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading secure portal...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Admin Topbar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-xl tracking-wide">LWF <span className="text-blue-400">Admin</span></h1>
        <button 
          onClick={handleLogout}
          className="text-sm bg-slate-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="container mx-auto px-4 max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Form to Add Event */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Event</h2>
          
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Makimei Visit" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
              <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Kikuyu" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                <input type="text" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 14" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Month</label>
                <input type="text" required value={month} onChange={e => setMonth(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. AUG" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
              <input type="text" required value={time} onChange={e => setTime(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 10:00 AM - 3:00 PM" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Poster Image URL (Optional)</label>
              <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/assets/images/..." />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="What will happen at this event?"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Publish Event"}
            </button>
          </form>
        </div>

        {/* Right Column: List of Events */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Active Events</h2>
          
          {events.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
              No events found. Add your first event using the form!
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{event.title}</h3>
                    <p className="text-sm text-slate-500">{event.location} • {event.date} {event.month}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Live on Site</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}