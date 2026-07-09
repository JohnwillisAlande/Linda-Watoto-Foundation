import Link from "next/link";
import ImpactMetrics from "@/components/ImpactMetrics";
import FAQ from "@/components/FAQ";

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
            <Link href="/join-us" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Join the Movement
            </Link>
            <Link href="/donations" className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Make a Donation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Metrics */}
      <ImpactMetrics />

      {/* 3. Core Activities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Core Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">🤝</div>
              <h3 className="text-xl font-bold mb-2">Visits & Mentorship</h3>
              <p className="text-slate-600 text-sm">Regular visits to children's homes to provide not just material support, but time, guidance, and companionship.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">⚽</div>
              <h3 className="text-xl font-bold mb-2">Community Hangouts</h3>
              <p className="text-slate-600 text-sm">Organizing interactive games and community events to foster joy, teamwork, and a sense of belonging.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">💝</div>
              <h3 className="text-xl font-bold mb-2">Sustainable Donations</h3>
              <p className="text-slate-600 text-sm">Providing crucial food items, bedding, and educational materials to ensure fundamental needs are met.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Voices of Impact (Testimonials inline) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">Voices of Impact</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Hear from the volunteers and partners who make our mission a reality.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <p className="text-slate-300 italic mb-6">"Volunteering with Linda Watoto has been a deeply transformative experience. Seeing the direct impact of our weekend visits on the children's faces is indescribable. It's more than charity; it's family."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">G</div>
                <div>
                  <h4 className="font-bold">Grace M.</h4>
                  <p className="text-xs text-blue-300">Active Volunteer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <p className="text-slate-300 italic mb-6">"The dedication of this team is unmatched. They don't just drop off donations; they stay, play games, and build real, lasting connections with the kids in our home."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">D</div>
                <div>
                  <h4 className="font-bold">David K.</h4>
                  <p className="text-xs text-emerald-300">Home Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <FAQ />

    </main>
  );
}