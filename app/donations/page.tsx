"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DonationsPage() {
  const [activeTab, setActiveTab] = useState<"cash" | "material">("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Added to match the database requirement
    phone: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCopyTill = () => {
    navigator.clipboard.writeText("8599132");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleMaterialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      let imageUrl = null;

      // 1. Upload the image if the user selected one
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('donations')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('donations')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // 2. Save everything to the database
      const { error: dbError } = await supabase.from("donations").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          donation_type: formData.category,
          description: formData.description,
          image_url: imageUrl,
        },
      ]);

      if (dbError) throw dbError;

      // 3. Success! Show message and reset form
      setSubmitMessage("Thank you! Your material donation offer has been received. Our team will contact you shortly to arrange the handover.");
      setFormData({ fullName: "", email: "", phone: "", category: "", description: "" });
      setImageFile(null);
      
      // Reset the actual file input element visually
      const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (err: unknown) {
      // Safely handle the error without using 'any'
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError("Something went wrong: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Support Our Cause</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Your generosity enables us to continue uplifting underprivileged children. Choose how you would like to make an impact today.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Custom Tab Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("cash")}
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === "cash" 
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            Cash Donation
          </button>
          <button
            onClick={() => setActiveTab("material")}
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === "material" 
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            Material Donation
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-8 md:p-12">
          
          {/* CASH DONATION TAB */}
          {activeTab === "cash" && (
            <div className="max-w-md mx-auto text-center animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">M-Pesa Contribution</h2>
              <p className="text-slate-600 mb-8">
                You can support our ongoing programs and emergency interventions directly through our secure M-Pesa Buy Goods Till.
              </p>
              
              <div className="bg-[#4CAF50] text-white p-8 rounded-2xl shadow-sm mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-90">Buy Goods Till Number</p>
                <div className="flex justify-center gap-2 mb-6">
                  {"8599132".split("").map((digit, index) => (
                    <span key={index} className="bg-white text-green-800 text-3xl md:text-4xl font-bold py-3 px-4 md:px-5 rounded-lg shadow-sm border border-green-200">
                      {digit}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={handleCopyTill}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center justify-center mx-auto gap-2"
                >
                  {copied ? "✓ Copied to clipboard" : "📋 Copy Till Number"}
                </button>
              </div>
              <p className="text-sm text-slate-500 font-medium">Any amount goes a long way. Thank you!</p>
            </div>
          )}

          {/* MATERIAL DONATION TAB */}
          {activeTab === "material" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Donate Supplies</h2>
                <p className="text-slate-600">
                  We gladly accept clothing, food items, books, and sanitary supplies. Fill out the form below and we will coordinate the drop-off.
                </p>
              </div>

              {submitMessage ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center font-medium">
                  {submitMessage}
                </div>
              ) : (
                <form onSubmit={handleMaterialSubmit} className="space-y-6 max-w-2xl mx-auto">
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                        Donation Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors bg-white"
                      >
                        <option value="">Select a category</option>
                        <option value="clothing">Clothing & Shoes</option>
                        <option value="food">Dry Food & Groceries</option>
                        <option value="education">Books & Stationery</option>
                        <option value="sanitary">Sanitary Towels & Hygiene</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="imageUpload" className="block text-sm font-semibold text-slate-700 mb-2">
                      Upload an Image (Optional)
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-slate-500 mt-2">Help us see what you are donating so we can prepare accordingly.</p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors resize-none"
                      placeholder="E.g., 2 boxes of primary school textbooks and assorted winter jackets."
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed w-full md:w-auto shadow-sm"
                    >
                      {isSubmitting ? "Submitting..." : "Offer Donation"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
        </div>
      </div>
    </main>
  );
}