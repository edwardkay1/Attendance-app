import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  ChevronLeft,
  GraduationCap
} from "lucide-react";

interface LecturerSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function LecturerSidebar({ isOpen, onToggle }: LecturerSidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: "/lecturer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/lecturer/classes", label: "My Classes", icon: BookOpen },
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
        className={`fixed left-0 top-0 h-full bg-white/70 backdrop-blur-2xl border-r border-white/40 transition-all duration-500 ease-out z-50 shadow-[20px_0_40px_rgba(0,0,0,0.02)] lg:translate-x-0 lg:static ${
          isOpen ? "w-72" : "w-20"
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
      {/* Header Section */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/50">
        {isOpen ? (
          <div className="flex items-center gap-3 duration-500 animate-in fade-in">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-xl flex items-center justify-center shadow-lg shadow-[#006838]/20">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black leading-none tracking-tight text-slate-900">Lecturer</h2>
              <span className="text-[10px] font-bold text-[#F9A825] uppercase tracking-[0.2em]">UMU Present</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full">
             <GraduationCap className="text-[#006838]" size={24} />
          </div>
        )}
        
        {/* Toggle Button - Liquid Floating Style */}
        <button
          onClick={onToggle}
          className={`absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1.5 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 text-slate-400 hover:text-[#006838] hidden lg:block`}
        >
          <ChevronLeft size={14} className={`transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation Menu */}
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
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile/System Footer Card */}
      <div className="absolute left-0 right-0 px-4 bottom-6">
        <div className={`bg-white/50 border border-white/60 p-4 rounded-[24px] shadow-sm transition-all duration-500 ${!isOpen ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 font-bold border-2 border-white rounded-full shadow-inner bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-600">
              L
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate text-slate-900">Staff Portal</p>
                <p className="text-[10px] font-bold text-[#F9A825] uppercase tracking-tighter">Academic Year 25/26</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}