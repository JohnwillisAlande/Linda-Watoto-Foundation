import Link from "next/link";

const events = [
  {
    id: "evt-1",
    title: "Mentorship & Games Hangout",
    location: "Makimei Children's Home, Kikuyu",
    date: "14",
    month: "AUG",
    time: "10:00 AM - 3:00 PM",
    description: "Join our core volunteer team for a day of outdoor games, talent showcases, and one-on-one mentorship with the children.",
  },
  {
    id: "evt-2",
    title: "Back-to-School Charity Drive",
    location: "Nairobi CBD (Central Drop-off)",
    date: "28",
    month: "AUG",
    time: "9:00 AM - 1:00 PM",
    description: "We are collecting textbooks, stationery, and backpacks to ensure every child is prepared for the new academic term.",
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just watch from the sidelines. Join us at our next community outreach, bring a friend, and be part of the change.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Calendar Date Badge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 border border-blue-100 rounded-2xl w-24 h-28 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-blue-100 text-blue-600">{event.month}</span>
                <span className="text-5xl font-extrabold leading-none text-slate-900 group-hover:text-white">{event.date}</span>
              </div>

              {/* Event Details */}
              <div className="flex flex-col flex-grow justify-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h2>
                
                {/* Location & Time Info */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span>📍</span> {event.location}
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span>⏰</span> {event.time}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  <Link 
                    href="/join-us"
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    RSVP to Attend
                  </Link>
                  <Link 
                    href="/donations"
                    className="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Support this Drive
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}