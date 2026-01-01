import React, { useState } from 'react';
import { X, UserPlus, GraduationCap, Briefcase, Shield, Loader2 } from 'lucide-react';
import { AuthService, type UserType } from '../../data/authService';
import Button from '../common/Button';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  facultyId: string;
  studentId?: string;
  employeeId?: string;
  department?: string;
  course?: string;
  year?: number;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
  userType?: UserType;
}

export default function AddUserModal({ isOpen, onClose, onUserCreated, userType }: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '', email: '', password: '',
    userType: userType || 'student',
    facultyId: '', studentId: '', employeeId: '',
    department: '', course: '', year: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = AuthService.register({
        ...formData,
        isApproved: true,
        approvedBy: 'admin_001',
        approvedAt: new Date().toISOString(),
      });

      if (success) {
        onUserCreated();
        onClose();
      } else {
        setError('Database conflict: This email might already exist.');
      }
    } catch (err) {
      setError('System error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400";
  const labelClass = "block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Liquid Backdrop */}
      <div 
        className="absolute inset-0 duration-300 bg-slate-900/40 backdrop-blur-md animate-in fade-in" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006838]/10 rounded-xl flex items-center justify-center text-[#006838]">
                <UserPlus size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-900">Add University Member</h3>
                <p className="text-xs font-bold tracking-tighter uppercase text-slate-400">Identity Management</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Stage */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-5">
            
            {/* User Type Selector (Visual Tabs) */}
            {!userType && (
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
                {(['student', 'lecturer', 'admin'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, userType: type }))}
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                      formData.userType === type 
                      ? "bg-white text-[#006838] shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {type === 'student' && <GraduationCap size={16} />}
                    {type === 'lecturer' && <Briefcase size={16} />}
                    {type === 'admin' && <Shield size={16} />}
                    <span className="text-[10px] font-black uppercase">{type}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Faculty</label>
                <select name="facultyId" value={formData.facultyId} onChange={handleInputChange} className={inputClass} required>
                  <option value="">Select Faculty</option>
                  <option value="science">Science & Tech</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="fobe">Business & Econ</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="e.g. John Doe" required />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="name@umu.ac.ug" required />
              </div>
              <div>
                <label className={labelClass}>Access Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className={inputClass} placeholder="••••••••" required />
              </div>
            </div>

            {/* Dynamic Fields Section */}
            <div className="pt-4 space-y-4 border-t border-slate-100">
              {formData.userType === 'student' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Course Program</label>
                    <input type="text" name="course" value={formData.course} onChange={handleInputChange} className={inputClass} placeholder="e.g. BS Computer Science" required />
                  </div>
                  <div>
                    <label className={labelClass}>Student Reg No.</label>
                    <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} className={inputClass} placeholder="23/UMU/SCI/001" required />
                  </div>
                  <div>
                    <label className={labelClass}>Academic Year</label>
                    <select name="year" value={formData.year} onChange={handleInputChange} className={inputClass}>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {formData.userType === 'lecturer' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className={labelClass}>Employee ID</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} className={inputClass} placeholder="EMP-2024-001" required />
                  </div>
                  <div>
                    <label className={labelClass}>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} className={inputClass} placeholder="e.g. IT Department" required />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 text-xs font-bold text-red-600 border border-red-100 bg-red-50 rounded-2xl animate-pulse">
                {error}
              </div>
            )}
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex gap-3 px-8 py-6 border-t bg-slate-50 border-slate-100">
          <Button variant="glass" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="flex-1 bg-[#006838] hover:bg-[#004d2a]"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Identity'}
          </Button>
        </div>
      </div>
    </div>
  );
}