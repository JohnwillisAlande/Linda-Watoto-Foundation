"use client";

import { useState } from "react";

export default function JoinUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Placeholder for your Next.js Server Action or API Route
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Registration submitted successfully! We will verify your payment and contact you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Member Registration</h1>
        <p className="text-slate-600">
          Fill out the form below and complete the registration fee payment to join the Linda Watoto Foundation.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {submitMessage ? (
          <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center font-medium">
            {submitMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  placeholder="Your answer"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  placeholder="Your answer"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  placeholder="Your answer"
                />
              </div>

              <div>
                <label htmlFor="idNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                  National ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  placeholder="Your answer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-semibold text-slate-700 mb-2">
                Institution (University/Workplace)
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                placeholder="Your answer"
              />
            </div>

            {/* Payment Section */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Pay Registration Fee ~ Ksh.250</h3>
              
              <div className="bg-[#4CAF50] text-white p-6 rounded-lg text-center mb-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-90">Buy Goods Till Number</p>
                <div className="flex justify-center gap-2 mb-2">
                  {"8599132".split("").map((digit, index) => (
                    <span key={index} className="bg-white text-green-800 text-2xl md:text-3xl font-bold py-2 px-3 md:px-4 rounded shadow-sm border border-green-200">
                      {digit}
                    </span>
                  ))}
                </div>
                <p className="text-sm mt-4 font-medium">Make payments to the till from any network</p>
              </div>

              <div>
                <label htmlFor="mpesaMessage" className="block text-sm font-semibold text-slate-700 mb-2">
                  Mpesa/Bank Message <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">Copy and paste, ensure Mpesa/Bank transaction code, amount, date and time appear.</p>
                <textarea
                  id="mpesaMessage"
                  name="mpesaMessage"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors resize-none"
                  placeholder="Paste your confirmation message here..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={(e) => (e.target as HTMLButtonElement).form?.reset()}
                className="text-sm text-slate-500 hover:text-slate-800 font-semibold"
              >
                Clear form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            
          </form>
        )}
      </div>
    </main>
  );
}