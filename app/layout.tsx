import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linda Watoto Foundation",
  description: "Uplifting underprivileged children through community engagement and sustainable support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        
        {/* Global Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
            {/* Brand Logo / Name */}
            <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              Linda Watoto
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex gap-6 font-medium text-slate-600">
              <Link href="/history" className="hover:text-blue-600 transition-colors">History</Link>
              <Link href="/management" className="hover:text-blue-600 transition-colors">Management</Link>
              <Link href="/achievements" className="hover:text-blue-600 transition-colors">Achievements</Link>
              <Link href="/testimonials" className="hover:text-blue-600 transition-colors">Testimonials</Link>
            </nav>

            {/* Call to Action Buttons */}
            <div className="flex gap-3">
              <Link href="/join-us" className="hidden md:inline-block px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Join Us
              </Link>
              <Link href="/donations" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Donate
              </Link>
            </div>
          </div>
        </header>

        {/* Main Page Content Injected Here */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-slate-900 text-slate-400 py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Linda Watoto Foundation</h3>
              <p>Dedicated to empowering the next generation through direct action, mentorship, and love.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
              <Link href="/join-us" className="hover:text-white transition-colors">Become a Member</Link>
              <Link href="/donations" className="hover:text-white transition-colors">Support Our Cause</Link>
              <Link href="/history" className="hover:text-white transition-colors">Our Story</Link>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg mb-2">Connect With Us</h3>
              {/* Note: Replace the '#' with your actual social URLs */}
              <a href="#" className="hover:text-white transition-colors">WhatsApp Group</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center">
            <p>&copy; {new Date().getFullYear()} Linda Watoto Foundation. All rights reserved.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}