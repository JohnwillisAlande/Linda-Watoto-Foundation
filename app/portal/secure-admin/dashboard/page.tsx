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

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string | null;
  google_photos_url: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<"events" | "donations" | "achievements">("events");

  // ========================
  // EVENTS STATE
  // ========================
  const [events, setEvents] = useState<FoundationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rawDate, setRawDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // ========================
  // DONATIONS STATE
  // ========================
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(false);

  // ========================
  // ACHIEVEMENTS STATE
  // ========================
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [isSubmittingAch, setIsSubmittingAch] = useState(false);
  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [existingAchImageUrl, setExistingAchImageUrl] = useState<string | null>(null);
  const [achTitle, setAchTitle] = useState("");
  const [achDate, setAchDate] = useState(""); // Will now hold YYYY-MM-DD
  const [achDescription, setAchDescription] = useState("");
  const [achGooglePhotosUrl, setAchGooglePhotosUrl] = useState("");
  const [achImageFile, setAchImageFile] = useState<File | null>(null);

  // ========================
  // DATA FETCHERS
  // ========================
  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const fetchDonations = async () => {
    setLoadingDonations(true);
    const { data } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
    if (data) setDonations(data);
    setLoadingDonations(false);
  };

  const fetchAchievements = async () => {
    setLoadingAchievements(true);
    // Notice we changed "created_at" to "date" here so the admin list sorts correctly too!
    const { data } = await supabase.from("achievements").select("*").order("date", { ascending: false });
    if (data) setAchievements(data);
    setLoadingAchievements(false);
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
  }, [router]);

  useEffect(() => {
    if (activeTab === "donations") fetchDonations();
    if (activeTab === "achievements") fetchAchievements();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal/secure-admin");
  };

  // Helper to format dates nicely for the admin preview
  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) { // If it's a new standard YYYY-MM-DD date
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return dateStr; // Fallback for any old typed string
  };

  // ========================
  // EVENT HANDLERS
  // ========================
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${minutes} ${ampm}`;
  };

  const handleEditClick = (event: FoundationEvent) => {
    setEditingId(event.id); setTitle(event.title); setLocation(event.location); setDescription(event.description); setExistingImageUrl(event.image_url || null);
    if (event.event_timestamp) {
      const d = new Date(event.event_timestamp);
      setRawDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    }
    if (event.time) {
      try {
        const [start, end] = event.time.split(' - ');
        const convertTo24 = (t: string) => {
          const [timePart, modifier] = t.split(' '); let [h, m] = timePart.split(':');
          if (h === '12') h = '00'; if (modifier === 'PM') h = String(parseInt(h, 10) + 12);
          return `${h.padStart(2, '0')}:${m}`;
        };
        if (start) setStartTime(convertTo24(start)); if (end) setEndTime(convertTo24(end));
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null); setTitle(""); setLocation(""); setRawDate(""); setStartTime(""); setEndTime(""); setDescription(""); setImageFile(null); setExistingImageUrl(null);
    const fileInput = document.getElementById('poster-upload') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const [yyyy, mm, dd] = rawDate.split('-');
      const dateObj = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
      const eventTimestampDate = new Date(`${rawDate}T${startTime}:00`);
      let finalImageUrl = existingImageUrl || "/assets/images/events/placeholder-1.jpg";

      if (imageFile) {
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${imageFile.name.split('.').pop()}`;
        await supabase.storage.from('events').upload(fileName, imageFile);
        finalImageUrl = supabase.storage.from('events').getPublicUrl(fileName).data.publicUrl;
      }

      const payload = {
        title, location, date: parseInt(dd, 10).toString(), month: dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        time: `${formatTime(startTime)} - ${formatTime(endTime)}`, description, image_url: finalImageUrl, event_timestamp: eventTimestampDate.toISOString(),
      };

      if (editingId) await supabase.from("events").update(payload).eq("id", editingId);
      else await supabase.from("events").insert([payload]);

      handleCancelEdit(); fetchEvents(); alert("Event saved!");
    } catch (err: any) { alert("Error: " + err.message); }
    finally { setIsSubmitting(false); }
  };

  // ========================
  // ACHIEVEMENT HANDLERS
  // ========================
  const handleEditAchClick = (ach: Achievement) => {
    setEditingAchId(ach.id); setAchTitle(ach.title); setAchDate(ach.date); setAchDescription(ach.description); setAchGooglePhotosUrl(ach.google_photos_url); setExistingAchImageUrl(ach.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelAchEdit = () => {
    setEditingAchId(null); setAchTitle(""); setAchDate(""); setAchDescription(""); setAchGooglePhotosUrl(""); setAchImageFile(null); setExistingAchImageUrl(null);
    const fileInput = document.getElementById('ach-upload') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };

  const handleDeleteAch = async (id: string) => {
    if (!window.confirm("Delete this achievement?")) return;
    await supabase.from("achievements").delete().eq("id", id);
    fetchAchievements();
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAch(true);
    try {
      let finalImageUrl = existingAchImageUrl || "";
      if (achImageFile) {
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${achImageFile.name.split('.').pop()}`;
        await supabase.storage.from('achievements').upload(fileName, achImageFile);
        finalImageUrl = supabase.storage.from('achievements').getPublicUrl(fileName).data.publicUrl;
      }

      const payload = { title: achTitle, date: achDate, description: achDescription, google_photos_url: achGooglePhotosUrl, image_url: finalImageUrl };

      if (editingAchId) await supabase.from("achievements").update(payload).eq("id", editingAchId);
      else await supabase.from("achievements").insert([payload]);

      handleCancelAchEdit(); fetchAchievements(); alert("Achievement saved!");
    } catch (err: any) { alert("Error: " + err.message); }
    finally { setIsSubmittingAch(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading secure portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50 gap-4 sm:gap-0">
        <h1 className="font-bold text-xl tracking-wide">LWF <span className="text-blue-400">Admin</span></h1>
        
        <div className="flex bg-slate-800 p-1 rounded-xl flex-wrap justify-center gap-1">
          <button onClick={() => setActiveTab("events")} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "events" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`}>Manage Events</button>
          <button onClick={() => setActiveTab("achievements")} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "achievements" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`}>Manage Achievements</button>
          <button onClick={() => setActiveTab("donations")} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "donations" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`}>View Donations</button>
        </div>

        <button onClick={handleLogout} className="text-sm bg-slate-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">Sign Out</button>
      </header>

      {/* ============================== */}
      {/* TAB 1: MANAGE EVENTS           */}
      {/* ============================== */}
      {activeTab === "events" && (
         <main className="container mx-auto px-4 max-w-6xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Left Column: Form */}
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
           <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
             <h2 className="text-2xl font-bold text-slate-900">{editingId ? "Edit Event" : "Create New Event"}</h2>
             {editingId && <button onClick={handleCancelEdit} className="text-sm font-bold text-slate-500 hover:text-slate-700">Cancel Edit</button>}
           </div>
           
           <form onSubmit={handleSaveEvent} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Event Title</label>
                 <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                 <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                 <input type="date" required value={rawDate} onChange={e => setRawDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Time</label>
                 <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">End Time</label>
                 <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Poster Image {editingId && existingImageUrl ? "(Optional)" : "(Optional)"}</label>
               <input id="poster-upload" type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} required={!editingId} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" />
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
               <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg resize-none"></textarea>
             </div>

             <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl disabled:opacity-50 text-lg ${editingId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
               {isSubmitting ? "Saving..." : editingId ? "Update Event" : "Publish Event"}
             </button>
           </form>
         </div>

         {/* Right Column: List */}
         <div>
           <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Active Events</h2>
           {events.map((event) => (
             <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 mb-4 shadow-sm flex items-start gap-4">
               {event.image_url && ( <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 relative overflow-hidden"><Image src={event.image_url} alt="Thumb" fill className="object-cover" unoptimized /></div> )}
               <div className="flex-grow">
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <h3 className="font-bold text-slate-900 text-lg">{event.title}</h3>
                     <p className="text-sm text-slate-500">{event.location} • {event.date} {event.month}</p>
                   </div>
                   <div className="flex gap-3">
                     <button onClick={() => handleEditClick(event)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Edit</button>
                     <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Delete</button>
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </main>
      )}

      {/* ============================== */}
      {/* TAB 2: MANAGE ACHIEVEMENTS     */}
      {/* ============================== */}
      {activeTab === "achievements" && (
        <main className="container mx-auto px-4 max-w-6xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">{editingAchId ? "Edit Achievement" : "Create Achievement"}</h2>
              {editingAchId && <button onClick={handleCancelAchEdit} className="text-sm font-bold text-slate-500 hover:text-slate-700">Cancel Edit</button>}
            </div>
            
            <form onSubmit={handleSaveAchievement} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                <input type="text" required value={achTitle} onChange={e => setAchTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Makimei Children's Home" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Achievement Date</label>
                <input type="date" required value={achDate} onChange={e => setAchDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
                <p className="text-xs text-slate-400 mt-1">This date will be used to correctly sort achievements newest-to-oldest.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Google Photos Album URL</label>
                <input type="url" required value={achGooglePhotosUrl} onChange={e => setAchGooglePhotosUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://photos.app.goo.gl/..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image {editingAchId && existingAchImageUrl ? "(Optional)" : ""}</label>
                <input id="ach-upload" type="file" accept="image/*" onChange={e => setAchImageFile(e.target.files ? e.target.files[0] : null)} required={!editingAchId} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                <textarea required value={achDescription} onChange={e => setAchDescription(e.target.value)} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmittingAch} className={`w-full text-white font-bold py-4 rounded-xl disabled:opacity-50 text-lg ${editingAchId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isSubmittingAch ? "Saving..." : editingAchId ? "Update Achievement" : "Publish Achievement"}
              </button>
            </form>
          </div>

          {/* Right Column: List */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Past Achievements</h2>
            {achievements.length === 0 && <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-500">No achievements yet.</div>}
            
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-white p-6 rounded-2xl border border-slate-200 mb-4 shadow-sm flex items-start gap-4">
                {ach.image_url && ( <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 relative overflow-hidden"><Image src={ach.image_url} alt="Thumb" fill className="object-cover" unoptimized /></div> )}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{ach.title}</h3>
                      {/* Uses the formatter we created to show "November 2025" instead of "2025-11-01" */}
                      <p className="text-sm text-slate-500">{formatFriendlyDate(ach.date)}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleEditAchClick(ach)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Edit</button>
                      <button onClick={() => handleDeleteAch(ach.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ============================== */}
      {/* TAB 3: VIEW DONATIONS          */}
      {/* ============================== */}
      {activeTab === "donations" && (
         <main className="container mx-auto px-4 max-w-6xl mt-10">
         <div className="mb-8 border-b border-slate-200 pb-4 flex items-center justify-between">
           <h2 className="text-2xl font-bold text-slate-900">Donation Records</h2>
           <button onClick={fetchDonations} className="text-sm text-blue-600 font-semibold hover:underline">Refresh Data</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {donations.map((donation) => (
             <div key={donation.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
               <span className={`px-3 py-1 rounded-full text-xs font-bold ${donation.donation_type === 'Monetary' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{donation.donation_type}</span>
               <h4 className="font-bold text-slate-900 mt-3">{donation.full_name}</h4>
               <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-3 rounded-lg">"{donation.description}"</p>
             </div>
           ))}
         </div>
       </main>
      )}
    </div>
  );
}