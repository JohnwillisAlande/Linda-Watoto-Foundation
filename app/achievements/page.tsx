import Link from "next/link";
import Image from "next/image";

// Defining the structures locally or importing from a shared config file
interface Visit {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
}

const visits: Visit[] = [
  {
    id: "makimei",
    title: "Makimei Children's Home",
    description: "Delivered food supplies, bedding, and spent a wonderful afternoon organizing games and mentorship sessions.",
    date: "November 2025",
    coverImage: "/assets/images/achievements/makimei-cover.jpg",
  },
  {
    id: "jesusHelpers",
    title: "Jesus Helpers Center",
    description: "Conducted a successful clothing drive and community outreach program for the children and local families.",
    date: "January 2026",
    coverImage: "/assets/images/achievements/jesus-helpers-cover.jpg",
  },
  {
    id: "promiseGiving",
    title: "Promise Giving Outreach",
    description: "Focused on educational support, distributing textbooks, writing materials, and setting up reading corners.",
    date: "February 2026",
    coverImage: "/assets/images/achievements/promise-cover.jpg",
  },
  {
    id: "neemaland",
    title: "Neemaland Children's Home",
    description: "Provided nutritional support packages and partnered with local medics to conduct basic health screenings.",
    date: "March 2026",
    coverImage: "/assets/images/achievements/neemaland-cover.jpg",
  },
  {
    id: "nuru",
    title: "Nuru Center Visit",
    description: "An interactive sports and arts hangout day focused on identifying and nurturing creative talents.",
    date: "April 2026",
    coverImage: "/assets/images/achievements/nuru-cover.jpg",
  },
  {
    id: "mogra",
    title: "Mogra Children's Rescue Centre",
    description: "Donation of dry food grains, sanitation facilities maintenance support, and early childhood mentorship.",
    date: "May 2026",
    coverImage: "/assets/images/achievements/mogra-cover.jpg",
  },
];

export default function AchievementsPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Achievements & Visits</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Every milestone represents a community uplifted, a child empowered, and a memory cherished. Explore our past journeys.
        </p>
      </div>

      {/* Grid Layout replacing the legacy client-side JS carousels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visits.map((visit) => (
          <div 
            key={visit.id} 
            className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
          >
            {/* Visual Aspect Container */}
            <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
              <Image
                src={visit.coverImage}
                alt={visit.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                {visit.date}
              </div>
            </div>

            {/* Content Wrap */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {visit.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {visit.description}
              </p>
              
              {/* Dynamic Next.js Link pointing to the sub-folder path */}
              <Link 
                href={`/achievements/${visit.id}`}
                className="w-full text-center py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 block"
              >
                View Photo Gallery
              </Link>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}