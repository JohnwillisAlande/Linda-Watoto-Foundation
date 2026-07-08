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
              <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
            </nav>

            {/* Call to Action Buttons */}
            <div className="flex items-center gap-4">
              
              {/* NEW ANIMATED JOIN US BUTTON */}
              <Link 
                href="/join-us" 
                className="group hidden md:flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-100"
              >
                <span className="font-bold mr-3 tracking-wide text-sm">Join Us</span>
                
                {/* The Blue Circle Background */}
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full transform transition-transform duration-300 group-hover:scale-110 shadow-sm">
                  {/* Handshake SVG */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                  >
                    <path d="M23.1 11.2l-4.1-4.1C18.4 6.5 17.6 6 16.7 6h-3.4l-4.7 4.7 1.8 1.8 3.8-3.8h2.5l3.2 3.2c.4.4.4 1 0 1.4l-1.6 1.6-4.5-4.5-1.8 1.8 4.5 4.5-2.2 2.2c-1.3 1.3-3.4 1.3-4.7 0l-5.4-5.4L1.7 11c-.9.9-1.4 2.1-1.4 3.4 0 1.3.5 2.5 1.4 3.4l4.2 4.2C6.8 22.9 8 23.4 9.3 23.4s2.5-.5 3.4-1.4l2.2-2.2 1.8 1.8 1.8-1.8-1.8-1.8 1.6-1.6c.9-.9 2.1-1.4 3.4-1.4 1.3 0 2.5.5 3.4 1.4l1.3-1.3c.6-.6.6-1.5 0-2.1zM9.4 14.8l-1.8-1.8-2.6 2.6c-.6.6-.6 1.6 0 2.2l1.6 1.6c.6.6 1.6.6 2.2 0l2.6-2.6-2-2z"/>
                  </svg>
                </span>
              </Link>

              {/* FIXED ANIMATED DONATE BUTTON */}
              <Link 
                href="/donations" 
                className="group flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 shadow-md hover:shadow-blue-600/40 transform hover:-translate-y-0.5"
              >
                <span className="font-bold mr-3 tracking-wide">Donate</span>
                
                {/* The White Circle Background */}
                <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full transform transition-transform duration-300 group-hover:scale-110 shadow-sm">
                  {/* The Heart SVG */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4 text-blue-600 transform transition-transform duration-300 group-hover:scale-125 group-hover:text-red-500"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </span>
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
          {/* ... (Footer remains exactly the same) ... */}
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