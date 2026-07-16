"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface FoundationEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  month: string;
  time: string;
  description: string;
  image_url?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<FoundationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Date & Time Selectors
  const [rawDate, setRawDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // File Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/portal/secure-admin");
        return;
      }
      fetchEvents();
    };

    checkUserAndFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Helper to convert "14:30" to "2:30 PM"
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Process the Date
      // Safely split the date string to avoid timezone shifting issues
      const [yyyy, mm, dd] = rawDate.split('-');
      const eventDateNum = parseInt(dd, 10).toString(); // e.g., "14"
      
      const dateObj = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
      const eventMonthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // e.g., "AUG"

      // 2. Process the Time
      const finalTimeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;

      // 3. Upload the Image (if provided)
      let finalImageUrl = "/assets/images/events/placeholder-1.jpg"; // Default fallback

      if (imageFile) {
        // Create a unique file name to prevent overwriting
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('events')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get the public URL for the newly uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('events')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      // 4. Save to Database
      const { error: dbError } = await supabase.from("events").insert([
        {
          title,
          location,
          date: eventDateNum,
          month: eventMonthStr,
          time: finalTimeString,
          description,
          image_url: finalImageUrl,
        },
      ]);

      if (dbError) throw dbError;

      alert("Event successfully published!");
      
      // Reset the form
      setTitle(""); setLocation(""); setRawDate(""); setStartTime(""); setEndTime(""); setDescription(""); setImageFile(null);
      // Reset the file input UI manually
      const fileInput = document.getElementById('poster-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      fetchEvents();

    } catch (error: any) {
      alert("Error adding event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal/secure-admin");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading secure portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-xl tracking-wide">LWF <span className="text-blue-400">Admin</span></h1>
        <button onClick={handleLogout} className="text-sm bg-slate-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">
          Sign Out
        </button>
      </header>

      {/* Changed to lg:grid-cols-2 for a 50/50 split, making the form much wider */}
      <main className="container mx-auto px-4 max-w-6xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Create New Event</h2>
          
          <form onSubmit={handleAddEvent} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Event Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Makimei Visit" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Kikuyu" />
              </div>

              {/* Date Selector */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                <input type="date" required value={rawDate} onChange={e => setRawDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
              </div>

              {/* Time Selectors */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Time</label>
                <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">End Time</label>
                <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
              </div>
            </div>

            {/* Native File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Poster Image (Optional)</label>
              <input 
                id="poster-upload"
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
              <p className="text-xs text-slate-400 mt-2">Upload a poster from your device. Must be an image file (JPG, PNG).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow" placeholder="What will happen at this event?"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg shadow-sm">
              {isSubmitting ? "Uploading & Publishing..." : "Publish Event"}
            </button>
          </form>
        </div>

        {/* Right Column: List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Active Events</h2>
          
          {events.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-500">
              No events found. Add your first event using the form!
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  
                  {/* Thumbnail Preview */}
                  {event.image_url && (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                      <img src={event.image_url} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-900 text-lg">{event.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{event.location} • {event.date} {event.month}</p>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Live on Site</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}