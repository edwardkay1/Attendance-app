import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle,
  Loader2,
  Lock,
  Mail
} from 'lucide-react';
import { AuthService, type UserType } from '../data/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = AuthService.login({ email, password, userType });
      if (user) {
        AuthService.saveUser(user);
        const paths = { student: '/student/dashboard', lecturer: '/lecturer/dashboard', admin: '/admin/dashboard' };
        navigate(paths[user.type]);
      } else {
        setError('Invalid credentials for selected role.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#f8faf8] overflow-hidden">
      {/* --- LIQUID UI ELEMENTS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#006838]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[100px]" />

      {/* --- MAIN LOGIN CARD (GLASS) --- */}
      <div className="relative w-full max-w-[450px] z-10">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[32px] p-8 lg:p-10">
          
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-[24px] flex items-center justify-center mb-4 shadow-xl shadow-[#006838]/20 ring-4 ring-white/30">
              <span className="text-2xl font-black tracking-tighter text-white">UMU</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
            <p className="text-sm font-medium text-slate-500">University Attendance System</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* User Type - Modern Apple-style Segmented Control */}
            <div className="space-y-3">
              <label className="text-[13px] font-semibold text-slate-600 uppercase tracking-wider ml-1">Role</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-200/30 p-1.5 rounded-2xl">
                {[
                  { value: 'student', label: 'Student', icon: GraduationCap },
                  { value: 'lecturer', label: 'Staff', icon: Briefcase },
                  { value: 'admin', label: 'Admin', icon: ShieldCheck }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setUserType(type.value as any)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
                      userType === type.value
                        ? 'bg-white shadow-md text-[#006838] scale-100'
                        : 'text-slate-500 hover:bg-white/50 scale-95 opacity-70'
                    }`}
                  >
                    <type.icon size={20} className="mb-1" strokeWidth={2.5} />
                    <span className="text-[11px] font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-slate-600 ml-1">Academic Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838] transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all placeholder:text-slate-400"
                  placeholder="name@umu.ac.ug"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[13px] font-semibold text-slate-600">Password</label>
                <a href="#" className="text-[12px] font-bold text-[#006838] hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838] transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-colors -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#006838] hover:bg-[#004d2a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#006838]/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn size={20} />
                </>
              )}
            </button>

            {error && (
              <div className="flex items-center gap-2 p-3 text-red-600 border border-red-100 bg-red-50 rounded-xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </form>

          <div className="pt-6 mt-8 text-center border-t border-slate-200/50">
            <p className="text-sm font-medium text-slate-500">
              New to the system?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-[#006838] font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Credentials Tooltip - Optional for Production */}
        <div className="mt-6 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Uganda Martyrs University © 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;