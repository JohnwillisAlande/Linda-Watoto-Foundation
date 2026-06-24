interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Volunteering with Linda Watoto has been a deeply transformative experience. Seeing the direct impact of our weekend visits on the children's faces is indescribable. It's more than charity; it's family.",
    author: "Grace M.",
    role: "Active Volunteer",
  },
  {
    id: "t2",
    quote: "The dedication of this team is unmatched. They don't just drop off donations; they stay, play games, and build real, lasting connections with the kids.",
    author: "David K.",
    role: "Home Administrator",
  },
  {
    id: "t3",
    quote: "Through the hangout and mentorship sessions, I've seen these children gain so much confidence. Linda Watoto is truly building and nurturing the next generation of leaders.",
    author: "Sarah W.",
    role: "Mentorship Lead",
  },
  {
    id: "t4",
    quote: "Partnering with Linda Watoto was the best decision for our CSR outreach. Their transparency and genuine love for the community make them stand out.",
    author: "James O.",
    role: "Corporate Partner",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Voices of Impact</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Don't just take our word for it. Hear from the volunteers, partners, and community members who make our mission a reality.
        </p>
      </div>

      {/* Testimonials Grid (Masonry-style layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Decorative Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none opacity-50">
              &ldquo;
            </div>
            
            {/* Content */}
            <div className="relative z-10 pl-6 pt-4">
              <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{testimonial.author}</h3>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Final Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to write your own story with us?</h2>
        <a 
          href="/join-us" 
          className="inline-block px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          Join Our Next Visit
        </a>
      </div>

    </main>
  );
}