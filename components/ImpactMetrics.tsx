"use client";

import { useEffect, useState, useRef } from "react";

const Counter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 1. Detect when the user scrolls to this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } 
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 2. Run the counting animation
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const increment = end / (duration / 16); 
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    // Changed to text-blue-600 so it pops clearly against the white background
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-blue-600 drop-shadow-sm">
      {count}{suffix}
    </div>
  );
};

export default function ImpactMetrics() {
  const metrics = [
    { id: 1, label: "Children Reached", value: 1500, suffix: "+", icon: "🌟" },
    { id: 2, label: "Homes Visited", value: 12, suffix: "", icon: "🏠" },
    { id: 3, label: "Active Volunteers", value: 150, suffix: "+", icon: "🤝" },
    { id: 4, label: "Community Events", value: 15, suffix: "+", icon: "⚽" },
  ];

  return (
    // Explicitly set to a white background with a subtle border to separate it from the Hero section
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-around items-center gap-12 md:gap-6 text-center">
          
          {metrics.map((metric) => (
            <div key={metric.id} className="flex flex-col items-center justify-center w-full md:w-1/4">
              {/* Light blue icon circle */}
              <div className="text-4xl mb-4 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-full shadow-sm border border-blue-100">
                {metric.icon}
              </div>
              
              {/* The Animated Number */}
              <Counter end={metric.value} suffix={metric.suffix} />
              
              {/* Dark gray label for perfect readability */}
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">
                {metric.label}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}