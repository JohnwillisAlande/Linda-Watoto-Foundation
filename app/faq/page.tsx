"use client";

import { useState } from "react";
import Link from "next/link";

// Centralized data for easy editing
const faqs = [
  {
    question: "What is the Linda Watoto Foundation?",
    answer: "We are a registered Public Benefit Organization (PBO) dedicated to uplifting underprivileged children through direct community engagement, mentorship, and sustainable material support."
  },
  {
    question: "How can I become a volunteer or member?",
    answer: "Joining is easy! Simply visit our Join Us page, fill out the membership form, and complete the one-time registration fee of Ksh. 250 via our M-Pesa Till number. Once verified, you will be added to our official communication channels."
  },
  {
    question: "What types of material donations do you accept?",
    answer: "We gratefully accept clothing, shoes, toys, dry food grains, educational materials (books, stationery), and sanitary supplies. All items should be in good, usable condition. You can arrange a drop-off/pick-up through our Donations page."
  },
  {
    question: "Can I donate money if I am outside of Kenya?",
    answer: "Absolutely. While our primary automated system uses M-Pesa, international donors can support our cause. Please reach out to our management team via our social channels to get the appropriate bank wire or international transfer details."
  },
  {
    question: "How often do you visit children's homes?",
    answer: "We organize children's home visits on a quarterly basis, alongside targeted emergency drives when specific homes reach out to us with urgent needs."
  },
  {
    question: "Is my donation actually reaching the children?",
    answer: "100% transparency is our core value. We document our visits, share impact metrics, and provide open updates to our registered members regarding how funds and materials are distributed during our drives."
  }
];

export default function FAQPage() {
  // State to track which accordion item is currently open (default to the first one)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    // If clicking the already open one, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl min-h-screen">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Everything you need to know about the Linda Watoto Foundation, our operations, and how you can get involved.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index} 
              className={`border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-blue-200 ring-1 ring-blue-50' : 'shadow-sm hover:border-blue-300'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors duration-200 ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>
                  {faq.question}
                </span>
                
                {/* Animated Plus/Minus Icon */}
                <span className={`ml-6 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-100 text-blue-700 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"} 
                    />
                  </svg>
                </span>
              </button>

              {/* Expandable Answer Area */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action Footer */}
      <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
        <p className="text-slate-600 mb-6">
          We are always happy to chat. Reach out to our management team directly or drop us a message on our social platforms.
        </p>
        <Link 
          href="/join-us" 
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Join Our Community
        </Link>
      </div>

    </main>
  );
}