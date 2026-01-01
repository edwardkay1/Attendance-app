import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '../Navbar';

interface AdminPageWrapperProps {
  children: React.ReactNode;
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col overflow-hidden">
      {/* 1. The Global Navbar 
          We've updated this to be a floating glass element in our previous iterations.
      */}
      <Navbar onMenuClick={toggleSidebar} userRole="admin" />

      <div className="relative flex flex-1 overflow-hidden">
        {/* 2. The Glass Sidebar 
            In the 2026 UMU UI, this component is backdrop-blurred and 
            effectively 'floats' over the background.
        */}
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* 3. The Main Content 'Stage' 
            We use a recessed container with inner-rounding to create 
            that premium Apple-style 'App within an App' look.
        */}
        <main className="flex-1 relative overflow-y-auto lg:rounded-tl-[40px] bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] border-t border-l border-slate-200/50 transition-all duration-500">
          
          {/* Dynamic Background Accents */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#006838]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F9A825]/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Scrolled Content Container */}
          <div className="relative z-10 p-4 sm:p-8 lg:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPageWrapper;