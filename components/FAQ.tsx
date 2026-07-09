"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  { question: "What is the Linda Watoto Foundation?", answer: "We are a registered Public Benefit Organization (PBO) dedicated to uplifting underprivileged children through direct community engagement, mentorship, and sustainable material support." },
  { question: "How can I become a volunteer or member?", answer: "Simply visit our Join Us page, fill out the membership form, and complete the registration fee of Ksh. 250. Once verified, you will be added to our official communication channels." },
  { question: "What types of material donations do you accept?", answer: "We accept clothing, shoes, dry food grains, educational materials, and sanitary supplies. You can arrange a drop-off through our Donations page." },
  { question: "How often do you visit children's homes?", answer: "We organize major community hangouts and home visits on a monthly basis, alongside targeted emergency drives when specific homes reach out to us with urgent needs." },
  { question: "What types of material donations do you accept?", answer: "We gratefully accept clothing, shoes, toys, dry food grains, educational materials (books, stationery), and sanitary supplies. All items should be in good, usable condition. You can arrange a drop-off/pick-up through our Donations page."}
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about our operations and how to help.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`border border-slate-200 bg-white rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-md border-blue-200 ring-1 ring-blue-50' : 'shadow-sm'}`}>
                <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-5 text-left focus:outline-none bg-white z-10 relative">
                  <span className={`font-bold transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>{faq.question}</span>
                  <span className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'bg-blue-100 text-blue-700 rotate-[135deg]' : 'bg-slate-100 text-slate-500'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{faq.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}