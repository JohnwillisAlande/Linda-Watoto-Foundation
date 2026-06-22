import Image from "next/image";

// Defining a type for our team members to keep the code clean and type-safe
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imagePath: string;
}

// You can easily update this array as the foundation's leadership grows
const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Jane Doe", // Replace with actual names
    role: "Founder & Executive Director",
    bio: "Dedicated to creating sustainable support systems for children across the region. Jane oversees the overarching vision and PBO compliance.",
    imagePath: "/assets/images/management/profile-placeholder.jpg", // Update with actual image paths
  },
  {
    id: "member-2",
    name: "John Smith",
    role: "Operations Manager",
    bio: "Coordinates logistics for all community hangouts, home visits, and ensures donations reach the right hands at the right time.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
  {
    id: "member-3",
    name: "Sarah Johnson",
    role: "Volunteer Coordinator",
    bio: "The bridge between our foundation and the community. Sarah manages volunteer onboarding, membership engagement, and event teams.",
    imagePath: "/assets/images/management/profile-placeholder.jpg",
  },
];

export default function ManagementPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Leadership Team</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Meet the dedicated individuals working behind the scenes to ensure the Linda Watoto Foundation fulfills its promise to the community.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-slate-100">
              {/* Note: Until you add the actual images to your public/assets/images/management/ folder, 
                this might show a broken image icon. You can temporarily comment out the <Image> tag 
                if you just want to see the layout.
              */}
              <Image
                src={member.imagePath}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Content Container */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h2>
              <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Call to Action for broader membership */}
      <div className="mt-20 bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Want to join the team?</h3>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          We are always looking for passionate individuals to join our general membership and volunteer network.
        </p>
        <a href="/join-us" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Become a Member
        </a>
      </div>

    </main>
  );
}