import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  GraduationCap, 
  School, 
  Hash, 
  Book, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle,
  ChevronRight,
  User
} from 'lucide-react';
import { AuthService, type UserType } from '../data/authService';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  facultyId: string;
  studentId?: string;
  employeeId?: string;
  department?: string;
  course?: string;
  year?: number;
}

const Register: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('student');
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '', email: '', password: '', confirmPassword: '',
    facultyId: '', studentId: '', employeeId: '',
    department: '', course: '', year: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const success = AuthService.register({ ...formData, userType });
      if (success) {
        alert('Registration successful! Awaiting Faculty Admin approval.');
        navigate('/login');
      } else {
        setError('Registration failed. Email might already be in use.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full pl-11 pr-4 py-3 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all placeholder:text-slate-400 text-sm";
  const iconStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838] transition-colors";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#f8faf8] overflow-x-hidden">
      {/* Liquid UI Background Blobs */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-[#006838]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-[550px] z-10 my-8">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[32px] p-6 lg:p-10">
          
          <div className="mb-8 text-center">
            <div className="mx-auto w-16 h-16 bg-[#006838] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#006838]/20">
              <UserPlus className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Join UMU Present</h2>
            <p className="text-sm font-medium text-slate-500">Create your academic account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Registering As</label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-200/30 rounded-2xl">
                {[
                  { value: 'student', label: 'Student', icon: GraduationCap },
                  { value: 'lecturer', label: 'Lecturer', icon: School }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setUserType(type.value as UserType)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                      userType === type.value
                        ? 'bg-white shadow-md text-[#006838]'
                        : 'text-slate-500 hover:bg-white/50 opacity-70'
                    }`}
                  >
                    <type.icon size={18} />
                    <span className="text-sm font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="relative space-y-1 group">
                <User className={iconStyle} size={18} />
                <input name="name" type="text" required value={formData.name} onChange={handleInputChange} className={inputStyle} placeholder="Full Name" />
              </div>

              {/* Email */}
              <div className="relative space-y-1 group">
                <Mail className={iconStyle} size={18} />
                <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className={inputStyle} placeholder="Email Address" />
              </div>

              {/* Faculty */}
              <div className="relative space-y-1 group md:col-span-2">
                <Building2 className={iconStyle} size={18} />
                <select name="facultyId" required value={formData.facultyId} onChange={handleInputChange} className={`${inputStyle} appearance-none`}>
                  <option value="">Select Faculty</option>
                  <option value="engineering">Engineering, Design & Tech</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="business">Business Administration</option>
                  <option value="medicine">Health Sciences</option>
                </select>
              </div>

              {/* Dynamic Fields - Student */}
              {userType === 'student' && (
                <>
                  <div className="relative group">
                    <Hash className={iconStyle} size={18} />
                    <input name="studentId" type="text" required value={formData.studentId} onChange={handleInputChange} className={inputStyle} placeholder="Student ID" />
                  </div>
                  <div className="relative group">
                    <Book className={iconStyle} size={18} />
                    <input name="course" type="text" required value={formData.course} onChange={handleInputChange} className={inputStyle} placeholder="Course / Program" />
                  </div>
                  <div className="relative group md:col-span-2">
                    <ChevronRight className={iconStyle} size={18} />
                    <select name="year" required value={formData.year} onChange={handleInputChange} className={`${inputStyle} appearance-none`}>
                      {[1, 2, 3, 4, 5].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                </>
              )}

              {/* Dynamic Fields - Lecturer */}
              {userType === 'lecturer' && (
                <>
                  <div className="relative group">
                    <Hash className={iconStyle} size={18} />
                    <input name="employeeId" type="text" required value={formData.employeeId} onChange={handleInputChange} className={inputStyle} placeholder="Employee ID" />
                  </div>
                  <div className="relative group">
                    <Building2 className={iconStyle} size={18} />
                    <input name="department" type="text" required value={formData.department} onChange={handleInputChange} className={inputStyle} placeholder="Department" />
                  </div>
                </>
              )}

              {/* Passwords */}
              <div className="relative group">
                <Lock className={iconStyle} size={18} />
                <input name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleInputChange} className={inputStyle} placeholder="Password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative group">
                <Lock className={iconStyle} size={18} />
                <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleInputChange} className={inputStyle} placeholder="Confirm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#006838] hover:bg-[#004d2a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#006838]/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={22} /> : <span>Create Account</span>}
            </button>

            {error && (
              <div className="flex items-center gap-2 p-4 text-red-600 border border-red-100 bg-red-50 rounded-xl">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </form>

          <div className="pt-6 mt-8 text-center border-t border-slate-200/50">
            <p className="text-sm font-medium text-slate-500">
              Already a member?{' '}
              <button onClick={() => navigate('/login')} className="text-[#006838] font-bold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;