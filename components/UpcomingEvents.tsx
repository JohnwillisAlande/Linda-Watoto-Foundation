import Link from "next/link";

// Mock data for your upcoming foundation activities
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

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Don't just watch from the sidelines. Join us at our next community outreach and be part of the change.
            </p>
          </div>
          <Link 
            href="/join-us" 
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group"
          >
            Become a Member to RSVP 
            <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Calendar Date Badge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-xl w-20 h-24 shadow-sm group-hover:border-blue-200 transition-colors">
                <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{event.month}</span>
                <span className="text-4xl font-extrabold text-slate-900 leading-none">{event.date}</span>
              </div>

              {/* Event Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                {/* Location & Time Info */}
                <div className="flex flex-col gap-2 mb-4 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {event.description}
                </p>

                {/* Action Button */}
                <Link 
                  href="/join-us"
                  className="w-full sm:w-auto text-center px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  RSVP / Get Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}