import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'glass';
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  isLoading = false,
  ...props
}: ButtonProps) {
  // Base classes with Apple-style "squircle" rounding and haptic scale effect
  const baseClasses = 'relative overflow-hidden px-6 py-3 rounded-[18px] font-bold transition-all duration-300 active:scale-[0.96] focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variantClasses = {
    // UMU Primary Green with a deep liquid gradient
    primary: 'bg-gradient-to-br from-[#006838] to-[#004d2a] text-white shadow-lg shadow-[#006838]/20 hover:shadow-[#006838]/30 focus:ring-[#006838]/20',
    
    // UMU Accent Gold for high-priority secondary actions
    gold: 'bg-gradient-to-br from-[#F9A825] to-[#e69615] text-white shadow-lg shadow-[#F9A825]/20 hover:shadow-[#F9A825]/30 focus:ring-[#F9A825]/20',
    
    // Subtle secondary for less important actions
    secondary: 'bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-slate-200',
    
    // Transparent glass variant for modern overlays
    glass: 'bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 hover:bg-white/40 focus:ring-white/20'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Shine effect overlay - the "Liquid" touch */}
      <span className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out -translate-y-full pointer-events-none bg-gradient-to-t from-transparent via-white/10 to-transparent hover:translate-y-full" />
      
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-medium opacity-80">Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}