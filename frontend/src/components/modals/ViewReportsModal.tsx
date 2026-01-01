import React, { useState } from 'react';
import { 
  X, FileText, Download, Calendar, 
  Layers, GraduationCap, Users, Loader2, Book 
} from 'lucide-react';
import { 
  generateAttendanceReport, generateStudentsReport, 
  generateLecturersReport, generateCoursesReport, downloadReport 
} from '../../utils/reportGenerator';
import Button from '../common/Button';

interface ViewReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReportFormData {
  reportType: 'attendance' | 'students' | 'courses' | 'lecturers';
  facultyId: string;
  courseId?: string;
  dateRange: { start: string; end: string; };
  format: 'pdf' | 'csv';
}

export default function ViewReportsModal({ isOpen, onClose }: ViewReportsModalProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    reportType: 'attendance',
    facultyId: '',
    courseId: '',
    dateRange: { start: '', end: '' },
    format: 'pdf',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setFormData(prev => ({ ...prev, dateRange: { ...prev.dateRange, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      let reportContent = '';
      let filename = `${formData.reportType}-report-${new Date().toISOString().split('T')[0]}`;

      switch (formData.reportType) {
        case 'attendance':
          reportContent = generateAttendanceReport(formData.facultyId || undefined, formData.courseId || undefined, formData.dateRange.start && formData.dateRange.end ? formData.dateRange : undefined);
          break;
        case 'students':
          reportContent = generateStudentsReport(formData.facultyId || undefined);
          break;
        case 'courses':
          reportContent = generateCoursesReport(formData.facultyId || undefined);
          break;
        case 'lecturers':
          reportContent = generateLecturersReport(formData.facultyId || undefined);
          break;
      }

      downloadReport(reportContent, filename, formData.format);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all outline-none font-medium text-slate-700";
  const labelClass = "flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 duration-300 bg-slate-900/40 backdrop-blur-md animate-in fade-in" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
        {/* Header - Intelligence Hub Branding */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#006838]/10 rounded-2xl flex items-center justify-center text-[#006838]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-900">Report Generator</h3>
                <p className="text-xs font-bold text-[#F9A825] uppercase tracking-tighter">Academic Data Export</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400"><X size={20} /></button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          
          {/* Report Type Selector */}
          <div>
            <label className={labelClass}><Layers size={14}/> Report Content</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'attendance', label: 'Attendance', icon: Calendar },
                { id: 'students', label: 'Students', icon: GraduationCap },
                { id: 'courses', label: 'Courses', icon: Book },
                { id: 'lecturers', label: 'Lecturers', icon: Users },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFormData(p => ({ ...p, reportType: item.id as any }))}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                    formData.reportType === item.id 
                    ? "border-[#006838] bg-[#006838]/5 text-[#006838] shadow-sm" 
                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filtering Logic */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Faculty Filter</label>
              <select name="facultyId" value={formData.facultyId} onChange={handleInputChange} className={inputClass}>
                <option value="">All Faculties</option>
                <option value="science">Science & Tech</option>
                <option value="agriculture">Agriculture</option>
                <option value="fobe">Business & Econ</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Export Format</label>
              <div className="flex bg-slate-100 p-1 rounded-xl h-[46px]">
                {['pdf', 'csv'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormData(p => ({ ...p, format: f as any }))}
                    className={`flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.format === f ? "bg-white text-[#006838] shadow-sm" : "text-slate-400"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date Range Group */}
          <div className="pt-4 border-t border-slate-100">
             <label className={labelClass}><Calendar size={14}/> Time Period</label>
             <div className="grid grid-cols-2 gap-4">
                <input type="date" name="start" value={formData.dateRange.start} onChange={handleInputChange} className={inputClass} />
                <input type="date" name="end" value={formData.dateRange.end} onChange={handleInputChange} className={inputClass} />
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 px-8 py-6 border-t bg-slate-50 border-slate-100">
          <Button variant="glass" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating}
            className="flex-1 bg-[#006838] hover:bg-[#004d2a] shadow-[#006838]/20"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <><Download size={16} className="mr-2"/> Export Data</>}
          </Button>
        </div>
      </div>
    </div>
  );
}