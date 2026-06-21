import Image from "next/image";

export default function HistoryPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Story</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          How a shared passion to help a few children grew into a foundation changing lives across the community.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-700 leading-relaxed">
            To uplift, educate, and empower underprivileged children by providing essential resources, mentorship, and a loving community environment.
          </p>
        </div>
        
        <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center">
          <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">👁️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
          <p className="text-slate-700 leading-relaxed">
            A world where every child, regardless of their background, has the opportunity to thrive, dream, and achieve their full potential.
          </p>
        </div>
      </div>

      {/* The Narrative */}
      <article className="prose prose-lg prose-slate mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">How It Began</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          The Linda Watoto Foundation began with a simple observation: too many children in our local communities were lacking basic necessities and, more importantly, a sense of belonging. What started as small weekend visits to children's homes quickly blossomed into an organized movement of dedicated volunteers.
        </p>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Growing Our Impact</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Over the years, we have expanded our reach from simple donations to comprehensive support systems. We organize regular hangouts, mentorship programs, and educational drives. Our volunteers are the backbone of this foundation, dedicating their time and resources to ensure that no child feels forgotten.
        </p>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Looking Forward</h3>
        <p className="text-slate-600 leading-relaxed">
          Today, as we finalize our registration as a Public Benefit Organization (PBO), our commitment remains as strong as day one: to protect, nurture, and empower the children who need it most, with full transparency and community backing.
        </p>
      </article>

    </main>
  );
}