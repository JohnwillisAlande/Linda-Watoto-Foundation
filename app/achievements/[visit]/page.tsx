import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// In a full production app, you would import this from your database or a shared config file.
// We are keeping it here so the page works instantly for you.
const galleryData: Record<string, { title: string; date: string; description: string; images: string[] }> = {
  makimei: {
    title: "Makimei Children's Home",
    date: "November 2025",
    description: "Delivered food supplies, bedding, and spent a wonderful afternoon organizing games and mentorship sessions.",
    images: [
      "/assets/images/achievements/makimei-1.jpg",
      "/assets/images/achievements/makimei-2.jpg",
      "/assets/images/achievements/makimei-3.jpg",
      "/assets/images/achievements/makimei-4.jpg",
      "/assets/images/achievements/makimei-5.jpg",
      "/assets/images/achievements/makimei-6.jpg",
    ],
  },
  jesusHelpers: {
    title: "Jesus Helpers Center",
    date: "January 2026",
    description: "Conducted a successful clothing drive and community outreach program for the children and local families.",
    images: [
      "/assets/images/achievements/jh-1.jpg",
      "/assets/images/achievements/jh-2.jpg",
      "/assets/images/achievements/jh-3.jpg",
    ],
  },
  // You can easily add the other homes (promiseGiving, neemaland, etc.) here
};

interface GalleryProps {
  params: {
    visit: string;
  };
}

export default function VisitGalleryPage({ params }: GalleryProps) {
  // 1. Grab the specific visit ID from the URL
  const visitId = params.visit;
  
  // 2. Look up the data for that visit
  const visit = galleryData[visitId];

  // 3. If someone types a random URL like /achievements/fake-place, show a 404 page automatically
  if (!visit) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Navigation Breadcrumb */}
      <Link 
        href="/achievements"
        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <span className="mr-2">←</span> Back to all achievements
      </Link>

      {/* Header Section */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{visit.title}</h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              {visit.description}
            </p>
          </div>
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
            {visit.date}
          </div>
        </div>
      </div>

      {/* The Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {visit.images.map((imgSrc, index) => (
          <div 
            key={index} 
            className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden group cursor-pointer"
          >
            {/* Note: Ensure these image paths actually exist in your public folder, 
                or temporarily comment out the Image tag if testing layout */}
            <Image
              src={imgSrc}
              alt={`${visit.title} gallery photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            
            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Empty State Fallback */}
      {visit.images.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">Photos for this visit are currently being curated. Check back soon!</p>
        </div>
      )}

    </main>
  );
}