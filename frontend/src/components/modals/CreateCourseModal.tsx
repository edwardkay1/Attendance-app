import React, { useState } from 'react';
import { X, BookPlus, Loader2, Landmark, GraduationCap, FileText } from 'lucide-react';
import Button from '../common/Button';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseCreated: () => void;
}

interface CourseFormData {
  name: string;
  code: string;
  department: string;
  facultyId: string;
  lecturerId: string;
  description?: string;
}

export default function CreateCourseModal({ isOpen, onClose, onCourseCreated }: CreateCourseModalProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    name: '', code: '', department: '', facultyId: '', lecturerId: '', description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      onCourseCreated();
      onClose();
      setFormData({ name: '', code: '', department: '', facultyId: '', lecturerId: '', description: '' });
    } catch (err) {
      setError('System encountered an error creating the course record.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400";
  const labelClass = "flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Liquid Backdrop */}
      <div 
        className="absolute inset-0 duration-300 bg-slate-900/40 backdrop-blur-md animate-in fade-in" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
        {/* Header - Academic Branding */}
        <div className="relative px-8 pt-8 pb-6 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#006838] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#006838]/20">
                <BookPlus size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black leading-tight tracking-tight text-slate-900">Create Course</h3>
                <p className="text-xs font-bold text-[#F9A825] uppercase tracking-tighter">Academic Registry</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 transition-all border border-transparent rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:border-slate-100">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            
            {/* Essential Info Group */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className={labelClass}><GraduationCap size={14}/> Course Title</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Advanced Algorithms" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}><FileText size={14}/> Code</label>
                <input type="text" name="code" value={formData.code} onChange={handleInputChange} placeholder="CS302" className={inputClass} required />
              </div>
            </div>

            {/* Academic Structure Group */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}><Landmark size={14}/> Faculty</label>
                <select name="facultyId" value={formData.facultyId} onChange={handleInputChange} className={inputClass} required>
                  <option value="">Select Faculty</option>
                  <option value="engineering">Engineering</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className={labelClass}><Landmark size={14}/> Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="e.g. Computing" className={inputClass} required />
              </div>
            </div>

            {/* Lecturer Link */}
            <div>
              <label className={labelClass}>Lead Lecturer ID</label>
              <div className="relative">
                <input type="text" name="lecturerId" value={formData.lecturerId} onChange={handleInputChange} placeholder="Employee ID (e.g. EMP-102)" className={inputClass} required />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 bg-white px-2 py-1 rounded-lg border border-slate-100 uppercase">Verification Required</div>
              </div>
            </div>

            {/* Description Area */}
            <div>
              <label className={labelClass}>Course Synopsis</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Brief overview of course objectives..." className={`${inputClass} resize-none`} />
            </div>

            {error && (
              <div className="p-4 text-xs font-bold text-red-600 border border-red-100 bg-red-50 rounded-2xl animate-pulse">
                {error}
              </div>
            )}
          </div>
        </form>

        {/* Action Footer */}
        <div className="flex gap-3 px-8 py-6 border-t bg-slate-50 border-slate-100">
          <Button variant="glass" className="flex-1" onClick={onClose} type="button">Discard</Button>
          <Button 
            variant="primary" 
            className="flex-1 bg-[#006838] hover:bg-[#004d2a]" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Register Course'}
          </Button>
        </div>
      </div>
    </div>
  );
}