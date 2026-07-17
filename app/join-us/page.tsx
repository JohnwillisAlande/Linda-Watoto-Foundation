"use client";

import { useState } from "react";
import Link from "next/link";
import { submitJoinForm } from "@/app/actions/joinForm";

export default function JoinUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    institution: "",
    mpesaMessage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Call the secure server action instead of fetching directly
    const result = await submitJoinForm(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg text-center border border-slate-200">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🎉
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Welcome to the Family!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Your membership application has been received successfully. Our team will verify your details and add you to our official communication channels shortly.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Become a Member
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join the Linda Watoto Foundation today and help us make a lasting impact. Follow the two simple steps below to complete your registration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Left Column: Payment Instructions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-sm rounded-full mb-4">
                STEP 1
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Registration Fee</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                To officially join the foundation, please pay the one-time registration fee of <strong>Ksh. 250</strong> via M-Pesa. You will need the confirmation message for Step 2.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-800 font-bold mb-2">Buy Goods Till Number</p>
                <div className="text-4xl font-extrabold text-green-700 tracking-widest mb-4">
                  8599132
                </div>
                <p className="text-xs text-green-600 uppercase font-bold tracking-wide">
                  Linda Watoto Foundation
                </p>
              </div>
            </div>

            <div className="bg-blue-900 p-8 rounded-2xl text-white text-center shadow-md">
              <h3 className="font-bold text-xl mb-2">Need Help?</h3>
              <p className="text-blue-200 text-sm mb-6">If you encounter any issues during registration, feel free to reach out to our support team.</p>
              <a href="mailto:support@lindawatoto.org" className="inline-block w-full py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Contact Support
              </a>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-200">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-sm rounded-full mb-4">
                STEP 2
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Submit Your Details</h2>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 font-medium border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Jael Amani" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. 0712345678" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. amanij@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">National ID Number <span className="text-red-500">*</span></label>
                    <input type="text" name="idNumber" required value={formData.idNumber} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. 12345678" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Institution (University/Workplace)</label>
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. Strathmore University" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mpesa/Bank Message <span className="text-red-500">*</span></label>
                  <p className="text-xs text-slate-400 mb-2">Copy and paste the full confirmation message (ensure transaction code, amount, and date appear).</p>
                  <textarea name="mpesaMessage" required value={formData.mpesaMessage} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow" placeholder="Paste message here..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg shadow-sm">
                  {isSubmitting ? "Submitting Application..." : "Submit Registration"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}