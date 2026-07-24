"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FoundationEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  month: string;
  time: string;
  description: string;
  image_url?: string;
  event_timestamp?: string; 
}

interface Donation {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  donation_type: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<"events" | "donations">("events");

  // Event State
  const [events, setEvents] = useState<FoundationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Date & Time Selectors
  const [rawDate, setRawDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // File Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Donations State
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(false);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setEvents(data);
    setLoading(false);
  };

  const fetchDonations = async () => {
    setLoadingDonations(true);
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setDonations(data);
    setLoadingDonations(false);
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

  useEffect(() => {
    if (activeTab === "donations") {
      fetchDonations();
    }
  }, [activeTab]);

  // Helper to convert "14:30" to "2:30 PM"
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // Helper to trigger edit mode
  const handleEditClick = (event: FoundationEvent) => {
    setEditingId(event.id);
    setTitle(event.title);
    setLocation(event.location);
    setDescription(event.description);
    setExistingImageUrl(event.image_url || null);
    
    // Parse Date for the input
    if (event.event_timestamp) {
      const d = new Date(event.event_timestamp);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setRawDate(`${yyyy}-${mm}-${dd}`);
    }
    
    // Parse Time back to 24-hour format for the HTML inputs
    if (event.time) {
      try {
        const [start, end] = event.time.split(' - ');
        const convertTo24 = (t: string) => {
          const [timePart, modifier] = t.split(' ');
          let [h, m] = timePart.split(':');
          if (h === '12') h = '00';
          if (modifier === 'PM') h = String(parseInt(h, 10) + 12);
          return `${h.padStart(2, '0')}:${m}`;
        };
        if (start) setStartTime(convertTo24(start));
        if (end) setEndTime(convertTo24(end));
      } catch (e) {
        console.error("Could not parse legacy time string", e);
      }
    }
    
    // Scroll smoothly to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle(""); setLocation(""); setRawDate(""); setStartTime(""); setEndTime(""); setDescription(""); 
    setImageFile(null); setExistingImageUrl(null);
    const fileInput = document.getElementById('poster-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      fetchEvents();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred.";
      alert("Error deleting event: " + errorMessage);
    }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const [yyyy, mm, dd] = rawDate.split('-');
      const eventDateNum = parseInt(dd, 10).toString();
      const dateObj = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
      const eventMonthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      
      const finalTimeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;
      
      const eventTimestampStr = `${rawDate}T${startTime}:00`;
      const eventTimestampDate = new Date(eventTimestampStr);

      let finalImageUrl = existingImageUrl || "/assets/images/events/placeholder-1.jpg";

      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('events')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('events')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      const payload = {
        title,
        location,
        date: eventDateNum,
        month: eventMonthStr,
        time: finalTimeString,
        description,
        image_url: finalImageUrl,
        event_timestamp: eventTimestampDate.toISOString(),
      };

      if (editingId) {
        // Update existing event
        const { error: dbError } = await supabase.from("events").update(payload).eq("id", editingId);
        if (dbError) throw dbError;
        alert("Event successfully updated!");
      } else {
        // Create new event
        const { error: dbError } = await supabase.from("events").insert([payload]);
        if (dbError) throw dbError;
        alert("Event successfully published!");
      }

      handleCancelEdit();
      fetchEvents();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      alert("Error saving event: " + errorMessage);
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
      <header className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50 gap-4 sm:gap-0">
        <h1 className="font-bold text-xl tracking-wide">LWF <span className="text-blue-400">Admin</span></h1>
        
        <div className="flex bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "events" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab("donations")}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "donations" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`}
          >
            View Donations
          </button>
        </div>

        <button onClick={handleLogout} className="text-sm bg-slate-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">
          Sign Out
        </button>
      </header>

      {/* ============================== */}
      {/* TAB 1: MANAGE EVENTS           */}
      {/* ============================== */}
      {activeTab === "events" && (
        <main className="container mx-auto px-4 max-w-6xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>
              {editingId && (
                <button onClick={handleCancelEdit} className="text-sm font-bold text-slate-500 hover:text-slate-700">
                  Cancel Edit
                </button>
              )}
            </div>
            
            <form onSubmit={handleSaveEvent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Event Title</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Makimei Visit" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                  <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Kikuyu" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                  <input type="date" required value={rawDate} onChange={e => setRawDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Time</label>
                  <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">End Time</label>
                  <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-slate-700" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Poster Image {editingId && existingImageUrl ? "(Optional: Leave blank to keep existing)" : "(Optional)"}
                </label>
                <input 
                  id="poster-upload"
                  type="file" 
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} 
                  required={!editingId} // Only required if we are creating a brand new event
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow" placeholder="What will happen at this event?"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 text-lg shadow-sm ${editingId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isSubmitting ? "Saving..." : editingId ? "Update Event" : "Publish Event"}
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
                  <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                    
                    {/* Thumbnail Preview */}
                    {event.image_url && (
                      <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 relative">
                        <Image src={event.image_url} alt="Thumbnail" fill className="object-cover" unoptimized />
                      </div>
                    )}

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">{event.title}</h3>
                          <p className="text-sm text-slate-500">{event.location} • {event.date} {event.month}</p>
                        </div>
                        
                        {/* Edit & Delete Action Buttons */}
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleEditClick(event)} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)} 
                            className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full inline-block">
                        Live on Site
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      )}

      {/* ============================== */}
      {/* TAB 2: VIEW DONATIONS          */}
      {/* ============================== */}
      {activeTab === "donations" && (
        <main className="container mx-auto px-4 max-w-6xl mt-10">
          <div className="mb-8 border-b border-slate-200 pb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Donation Records</h2>
            <button onClick={fetchDonations} className="text-sm text-blue-600 font-semibold hover:underline">
              Refresh Data
            </button>
          </div>

          {loadingDonations ? (
            <div className="text-center py-20 text-slate-500 animate-pulse font-medium">Loading records...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">No donations found</h3>
              <p className="text-slate-500 text-sm">When users submit the donation form, they will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <div key={donation.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${donation.donation_type === 'Monetary' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {donation.donation_type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="p-5 flex-grow space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900">{donation.full_name}</h4>
                      <a href={`mailto:${donation.email}`} className="text-sm text-blue-600 hover:underline block">{donation.email}</a>
                      <a href={`tel:${donation.phone}`} className="text-sm text-slate-500 hover:text-slate-700 block">{donation.phone}</a>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                        "{donation.description}"
                      </p>
                    </div>

                    {/* Attached Image */}
                    {donation.image_url && (
                      <div className="pt-2">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Attached Image</p>
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                          <Image 
                            src={donation.image_url} 
                            alt="Donation Attachment" 
                            fill 
                            className="object-contain" 
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

    </div>
  );
}