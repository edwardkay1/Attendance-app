import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Info } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'danger';

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'success':
        return {
          styles: 'bg-green-500/10 text-green-700 border-green-200/50 shadow-sm shadow-green-500/5',
          icon: <CheckCircle2 size={12} className="mr-1" strokeWidth={3} />
        };
      case 'warning':
        return {
          styles: 'bg-[#F9A825]/10 text-[#c7861e] border-[#F9A825]/20 shadow-sm shadow-[#F9A825]/5',
          icon: <Clock size={12} className="mr-1" strokeWidth={3} />
        };
      case 'error':
        return {
          styles: 'bg-red-500/10 text-red-700 border-red-200/50 shadow-sm shadow-red-500/5',
          icon: <AlertCircle size={12} className="mr-1" strokeWidth={3} />
        };
      case 'danger':
        return {
          styles: 'bg-red-500/10 text-red-700 border-red-200/50 shadow-sm shadow-red-500/5',
          icon: <AlertCircle size={12} className="mr-1" strokeWidth={3} />
        };
      case 'info':
        return {
          styles: 'bg-blue-500/10 text-blue-700 border-blue-200/50 shadow-sm shadow-blue-500/5',
          icon: <Info size={12} className="mr-1" strokeWidth={3} />
        };
      default:
        return {
          styles: 'bg-slate-100 text-slate-600 border-slate-200',
          icon: null
        };
    }
  };

  const { styles, icon } = getStatusConfig(status);

  return (
    <span className={`
      inline-flex items-center 
      px-3 py-1 
      rounded-full 
      text-[11px] font-black uppercase tracking-wider
      backdrop-blur-md border
      transition-all duration-300
      ${styles}
    `}>
      {icon}
      {children}
    </span>
  );
};

export { StatusBadge };