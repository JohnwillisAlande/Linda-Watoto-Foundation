import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Empowering the Next Generation
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            The Linda Watoto Foundation is dedicated to uplifting underprivileged children through community engagement, mentorship, and sustainable support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/join-us" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Join the Movement
            </Link>
            <Link 
              href="/donations" 
              className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Activities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Core Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">🤝</div>
              <h3 className="text-xl font-bold mb-2">Visits & Mentorship</h3>
              <p className="text-slate-600">
                Regular visits to children's homes to provide not just material support, but time, guidance, and companionship.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">⚽</div>
              <h3 className="text-xl font-bold mb-2">Community Hangouts</h3>
              <p className="text-slate-600">
                Organizing interactive games and community events to foster joy, teamwork, and a sense of belonging.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">💝</div>
              <h3 className="text-xl font-bold mb-2">Sustainable Donations</h3>
              <p className="text-slate-600">
                Providing crucial food items, bedding, and educational materials to ensure fundamental needs are met.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Journey & Impact Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">See Our Impact</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Explore our past visits and see firsthand the smiles and milestones we've shared with communities across the region.
          </p>
          <Link 
            href="/achievements" 
            className="inline-block px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            View Our Gallery
          </Link>
        </div>
      </section>

    </main>
  );
}