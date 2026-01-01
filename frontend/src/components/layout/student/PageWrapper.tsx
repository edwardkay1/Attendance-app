import { useState } from "react";
import Sidebar from "./Sidebar";
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
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col overflow-hidden">
      {/* 1. The Global Navbar */}
      <Navbar onMenuClick={toggleSidebar} userRole="student" />

      <div className="relative flex flex-1 overflow-hidden">
        {/* 2. The Glass Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* 3. The Interactive Stage 
            Rounded corners and subtle borders make the content feel like a 'Sheet' 
            sliding over the university-branded background.
        */}
        <main className={`
          relative flex-1 transition-all duration-500 ease-in-out
          lg:m-4 lg:rounded-[32px] 
          bg-white/60 backdrop-blur-md 
          border border-white/40 shadow-xl shadow-slate-200/50
          overflow-y-auto overflow-x-hidden
        `}>
          
          {/* Content Constraints */}
          <div className="p-4 sm:p-8 lg:p-10">
            <div className="max-w-6xl mx-auto duration-700 animate-in fade-in slide-in-from-bottom-6">
              
              {/* Header Context (Optional, for Student Identity) */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">Student Portal</h1>
                  <p className="text-xs font-bold text-[#006838] uppercase tracking-widest">Uganda Martyrs University</p>
                </div>
              </div>

              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Global CSS for the Student Experience */}
      <style>{`
        /* Smooth scrolling for glass panes */
        main {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Hide scrollbar for a cleaner 'App' look while maintaining functionality */
        main::-webkit-scrollbar {
          width: 4px;
        }
        main::-webkit-scrollbar-thumb {
          background: rgba(0, 104, 56, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}