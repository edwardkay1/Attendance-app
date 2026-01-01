import { useState } from 'react';
import { 
  Clock, ChevronRight, QrCode, FileText, 
  UserCheck, X
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import QRCodeGenerator from "../../components/common/QRCodeGenerator";
import { getCoursesByLecturerId } from "../../data/mockLecturerData";
import { getCurrentLecturer } from "../../data/authService";
import Button from "../../components/common/Button";

export default function LecturerClasses() {
  const currentLecturer = getCurrentLecturer();
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];
  const navigate = useNavigate();

  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [selectedCourseForQR, setSelectedCourseForQR] = useState<string | null>(null);

  const handleGenerateQR = (courseId: string) => {
    setSelectedCourseForQR(courseId);
    setShowQRGenerator(true);
  };

  if (!currentLecturer) return null; // Logic handled in dashboard or higher level

  return (
    <PageWrapper>
      <div className="pb-20 mx-auto space-y-10 max-w-7xl">
        
        {/* 1. Dynamic Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Academic Registry</h1>
            <p className="mt-1 font-medium text-slate-500">Detailed management of your assigned courses and student rosters.</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button className="px-6 py-2.5 bg-white shadow-sm rounded-xl text-xs font-black uppercase tracking-widest text-slate-900">Current Sem</button>
            <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-700">Archived</button>
          </div>
        </div>

        {/* 2. Advanced Course Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="group relative bg-white border border-slate-100 rounded-[40px] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60 overflow-hidden">
              {/* Contextual Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#006838] to-[#006838]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-xl text-[#006838] group-hover:bg-[#006838] group-hover:text-white transition-all duration-500">
                  {course.code.charAt(0)}
                </div>
                <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                  {course.department}
                </span>
              </div>

              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-[#006838] transition-colors">{course.name}</h3>
                <p className="text-xs font-bold tracking-tighter uppercase text-slate-400">{course.code}</p>
              </div>

              {/* Schedule Micro-View */}
              <div className="p-5 mb-8 space-y-4 bg-slate-50/50 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Weekly Schedule</p>
                {course.schedule.map((session) => (
                  <div key={session.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#F9A825] shadow-sm">
                        <Clock size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{session.day}</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900">{session.time}</span>
                  </div>
                ))}
              </div>

              {/* Action Suite */}
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate(`/lecturer/course/${course.id}`)}
                  className="flex-1 h-12 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  Details <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => handleGenerateQR(course.id)}
                  className="w-12 h-12 rounded-2xl bg-[#006838]/5 text-[#006838] hover:bg-[#006838] hover:text-white transition-all flex items-center justify-center"
                >
                  <QrCode size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Global Quick Actions Overlay */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#F9A825]/10 text-[#F9A825] rounded-[24px] flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Rapid Attendance</h3>
              <p className="text-sm font-medium text-slate-500">Alternative entry methods for administrative overrides.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="glass" className="border-slate-200">
              <FileText size={18} className="mr-2" /> View Reports
            </Button>
            <Button onClick={() => navigate('/lecturer/mark-attendance')} className="bg-[#006838] text-white px-8">
              Manual Override
            </Button>
          </div>
        </div>
      </div>

      {/* Modernized QR Portal Modal */}
      {showQRGenerator && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 duration-300 bg-slate-900/60 backdrop-blur-xl animate-in fade-in" 
            onClick={() => setShowQRGenerator(false)} 
          />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Generate Session</h3>
                <p className="mt-1 text-xs font-bold tracking-widest uppercase text-slate-400">Course ID: {selectedCourseForQR}</p>
              </div>
              <button 
                onClick={() => setShowQRGenerator(false)} 
                className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-slate-50 text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>
            
            <QRCodeGenerator
              lecturerId={currentLecturer?.id || ''}
              courseId={selectedCourseForQR || ''}
              onQRGenerated={() => setShowQRGenerator(false)}
            />
            
            <div className="flex items-center gap-4 p-4 mt-8 border border-blue-100 bg-blue-50 rounded-2xl">
              <div className="text-blue-600"><QrCode size={20} /></div>
              <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                The generated QR code will refresh every 10 seconds to prevent unauthorized location sharing.
              </p>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}