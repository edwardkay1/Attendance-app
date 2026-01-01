import { useState } from "react";
import LecturerSidebar from "./LecturerSidebar";
import Navbar from "../Navbar";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed for mobile-first

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col overflow-hidden">
      {/* 1. The Global Navbar */}
      <Navbar onMenuClick={toggleSidebar} userRole="lecturer" />

      <div className="relative flex flex-1 overflow-hidden">
        {/* 2. The Glass Sidebar */}
        <LecturerSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* 3. The Main Content 'Stage' 
            A large, white, rounded container that creates the app-in-app feel.
        */}
        <main className={`
          relative flex-1 min-h-screen 
          transition-all duration-500 
          bg-white/80 backdrop-blur-sm 
          lg:m-4 lg:rounded-[40px] lg:border lg:border-slate-200/50 
          lg:shadow-[0_8px_32px_rgba(0,0,0,0.02)]
          overflow-y-auto
        `}>
          {/* Inner Content Padding */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-[1400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Custom Scrollbar Styling (Internal) */}
      <style>{`
        main::-webkit-scrollbar {
          width: 6px;
        }
        main::-webkit-scrollbar-track {
          background: transparent;
        }
        main::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        main::-webkit-scrollbar-thumb:hover {
          background: #006838;
        }
      `}</style>
    </div>
  );
}