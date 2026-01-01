import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  X, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
  ];

  const handleSignOut = () => {
    // Logic for sign out
    navigate('/login');
  };

  return (
    <>
      {/* Liquid Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Glass Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 
        bg-white/70 backdrop-blur-2xl border-r border-white/40
        shadow-[20px_0_40px_rgba(0,0,0,0.02)]
        transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Branding Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-xl flex items-center justify-center shadow-lg shadow-[#006838]/20">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black leading-none tracking-tight text-slate-900">Admin</h2>
              <span className="text-[10px] font-bold text-[#F9A825] uppercase tracking-[0.2em]">UMU Portal</span>
            </div>
          </div>
          <button onClick={onToggle} className="p-2 transition-colors rounded-full text-slate-400 lg:hidden hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-8 h-[calc(100vh-160px)] overflow-y-auto">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && onToggle()}
                    className={`
                      group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300
                      ${isActive
                        ? 'bg-[#006838] text-white shadow-lg shadow-[#006838]/20 translate-x-1'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#006838]'}`} size={20} strokeWidth={2.5} />
                      <span className="text-sm font-bold tracking-wide">{item.name}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="opacity-50" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Glass Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white/50 border border-white/60 p-4 rounded-[24px] shadow-sm">
            <div className="flex items-center mb-3 space-x-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 font-bold border-2 border-white rounded-full shadow-sm bg-slate-200 text-slate-600">
                  SA
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-slate-900">System Admin</p>
                <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">Nkozi Campus</p>
              </div>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl transition-all border border-red-100/50"
            >
              <LogOut size={14} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
              SIGN OUT
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;