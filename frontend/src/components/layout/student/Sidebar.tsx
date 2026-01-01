import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCheck, 
  ChevronLeft, 
  ShieldCheck 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/student/attendance", label: "My Attendance", icon: UserCheck },
  ];

  return (
    <>
      {/* Liquid Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-white/70 backdrop-blur-2xl border-r border-white/40 transition-all duration-500 ease-out z-[60] shadow-[20px_0_40px_rgba(0,0,0,0.02)] lg:translate-x-0 lg:static ${
          isOpen ? "w-72" : "w-20"
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
      {/* 1. Header with Branding */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/50">
        {isOpen ? (
          <div className="flex items-center gap-3 duration-500 animate-in fade-in">
            <div className="w-9 h-9 bg-[#006838] rounded-xl flex items-center justify-center shadow-lg shadow-[#006838]/20">
              <ShieldCheck className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-black leading-none tracking-tight text-slate-900">Present</h2>
              <span className="text-[10px] font-bold text-[#F9A825] uppercase tracking-[0.2em]">Student</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center text-[#006838]">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* 2. Floating Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-24 bg-white border border-slate-200 rounded-full p-1.5 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 text-slate-400 hover:text-[#006838]"
      >
        <ChevronLeft size={14} className={`transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 3. Navigation Menu */}
      <nav className="px-4 mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`group flex items-center rounded-2xl transition-all duration-300 h-12 ${
                    isActive
                      ? "bg-[#006838] text-white shadow-lg shadow-[#006838]/20"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  } ${isOpen ? "px-4" : "justify-center px-0"}`}
                >
                  <Icon 
                    size={20} 
                    className={`shrink-0 transition-transform duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-[#006838] group-hover:scale-110"}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {isOpen && (
                    <span className="ml-3 text-sm font-bold tracking-wide animate-in slide-in-from-left-2">
                      {item.label}
                    </span>
                  )}

                  {isActive && isOpen && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_8px_white]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 4. Bottom Identity Card */}
      <div className="absolute left-0 right-0 px-4 bottom-6">
        <div className={`
          bg-white/50 border border-white/80 p-4 rounded-[24px] shadow-sm 
          transition-all duration-500 
          ${!isOpen ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
        `}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 font-bold border-2 border-white rounded-full bg-slate-100 text-slate-500">
              S
            </div>
            <div>
              <p className="text-xs font-black truncate text-slate-900">UMU Student</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Session</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}