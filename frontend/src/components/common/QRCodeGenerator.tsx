import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Button from '../common/Button';
import { 
  QrCode, 
  Calendar, 
  MapPin, 
  Timer, 
  Download, 
  CircleStop, 
  Info,
  ChevronDown,
  BookOpen,
  Loader2
} from 'lucide-react';
import { 
  getLecturerById, 
  getCoursesByLecturerId, 
  createQRSession, 
  type Course, 
  type CourseSchedule, 
  type QRCodeSession 
} from '../../data/mockLecturerData';

interface QRCodeGeneratorProps {
  lecturerId?: string;
  courseId?: string;
  onQRGenerated?: (session: QRCodeSession) => void;
}

export default function QRCodeGenerator({ lecturerId = 'LEC001', courseId, onQRGenerated }: QRCodeGeneratorProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<CourseSchedule | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<QRCodeSession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const lecturer = getLecturerById(lecturerId);
  const courses = lecturer ? getCoursesByLecturerId(lecturer.id) : [];

  useEffect(() => {
    if (courseId && courses.length > 0) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
      }
    }
  }, [courseId, courses]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentSession && timeRemaining > 0) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((new Date(currentSession.expiresAt).getTime() - Date.now()) / 1000));
        setTimeRemaining(remaining);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentSession, timeRemaining]);

  const generateQRCode = async () => {
    if (!selectedCourse || !selectedSchedule || !lecturer) return;
    setIsGenerating(true);
    try {
      const session = createQRSession(selectedCourse, lecturer, selectedSchedule);
      setCurrentSession(session);
      const url = await QRCode.toDataURL(session.qrData, {
        width: 400,
        margin: 2,
        color: { dark: '#006838', light: '#FFFFFF' } // UMU Green QR
      });
      setQrCodeUrl(url);
      setTimeRemaining(Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000));
      onQRGenerated?.(session);
    } catch (error) {
      console.error('QR Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const stopSession = () => {
    setCurrentSession(null);
    setQrCodeUrl('');
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectBaseStyle = "w-full pl-11 pr-10 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all appearance-none font-medium text-slate-700";

  return (
    <div className="space-y-8 duration-500 animate-in fade-in slide-in-from-bottom-4">
      {/* 1. Configuration Card */}
      <div className="bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[32px] p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#006838]/10 rounded-2xl flex items-center justify-center text-[#006838]">
            <QrCode size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Session Generator</h3>
            <p className="text-sm font-medium text-slate-500">Create a new attendance scan point</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <div className="relative space-y-2 group">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Select Course</label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838]" size={18} />
              <select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = courses.find(c => c.id === e.target.value);
                  setSelectedCourse(course || null);
                  setSelectedSchedule(null);
                  setQrCodeUrl('');
                }}
                className={selectBaseStyle}
              >
                <option value="">Choose a course...</option>
                {courses.map(course => <option key={course.id} value={course.id}>{course.code} - {course.name}</option>)}
              </select>
              <ChevronDown className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {selectedCourse && (
            <div className="relative space-y-2 group animate-in zoom-in-95">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Class Schedule</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838]" size={18} />
                <select
                  value={selectedSchedule?.id || ''}
                  onChange={(e) => {
                    const schedule = selectedCourse.schedule.find(s => s.id === e.target.value);
                    setSelectedSchedule(schedule || null);
                  }}
                  className={selectBaseStyle}
                >
                  <option value="">Choose a class time...</option>
                  {selectedCourse.schedule.map(schedule => (
                    <option key={schedule.id} value={schedule.id}>{schedule.day} {schedule.time} — {schedule.location}</option>
                  ))}
                </select>
                <ChevronDown className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" size={18} />
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={generateQRCode}
          disabled={!selectedCourse || !selectedSchedule || isGenerating}
          variant="primary"
          className="w-full py-4 text-lg"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <><QrCode size={20} /> Generate QR Code</>}
        </Button>
      </div>

      {/* 2. Live QR Display Card */}
      {qrCodeUrl && currentSession && (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl p-8 lg:p-12 text-center relative overflow-hidden animate-in slide-in-from-top-8">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#006838]" />
          
          <div className="mb-8">
            <h4 className="mb-2 text-2xl font-black tracking-tight text-slate-900">Active Attendance Session</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">{currentSession.courseName}</span>
              <span className="px-4 py-1.5 bg-[#F9A825]/10 rounded-full text-xs font-bold text-[#F9A825] uppercase tracking-widest">{currentSession.location}</span>
            </div>
          </div>

          {/* High Contrast QR Area */}
          <div className="relative inline-block p-6 bg-white rounded-[32px] border-4 border-[#006838]/10 shadow-inner group transition-transform hover:scale-[1.02]">
            <img src={qrCodeUrl} alt="Session QR" className="object-contain w-64 h-64 lg:w-80 lg:h-80 rounded-xl" />
            <div className="absolute flex items-center gap-2 px-6 py-2 -translate-x-1/2 bg-white border rounded-full shadow-lg -bottom-4 left-1/2 border-slate-100">
               <div className={`w-2 h-2 rounded-full animate-ping ${timeRemaining < 300 ? 'bg-red-500' : 'bg-green-500'}`} />
               <span className="font-mono text-sm font-black text-slate-700">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {/* Session Metadata Grid */}
          <div className="grid max-w-2xl grid-cols-1 gap-4 mx-auto my-10 sm:grid-cols-3">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <MapPin className="text-[#006838]" size={20} />
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase">Venue</p><p className="text-sm font-bold text-slate-700">{currentSession.location}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <Timer className="text-[#006838]" size={20} />
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p><p className="text-sm font-bold text-slate-700">60 mins</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <Calendar className="text-[#006838]" size={20} />
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase">Date</p><p className="text-sm font-bold text-slate-700">{new Date(currentSession.date).toLocaleDateString()}</p></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
            <Button 
              variant="glass" 
              className="flex-1"
              onClick={() => {
                const link = document.createElement('a');
                link.download = `UMU-QR-${currentSession.id}.png`;
                link.href = qrCodeUrl;
                link.click();
              }}
            >
              <Download size={18} /> Download
            </Button>
            <Button 
              className="flex-1 bg-red-500 hover:bg-red-600 shadow-red-200"
              onClick={stopSession}
            >
              <CircleStop size={18} /> Stop Session
            </Button>
          </div>

          <div className="mt-8 p-4 bg-[#006838]/5 rounded-2xl flex items-start gap-3 text-left border border-[#006838]/10 max-w-xl mx-auto">
            <Info className="text-[#006838] shrink-0 mt-0.5" size={18} />
            <p className="text-xs font-medium leading-relaxed text-slate-600">
              Display this QR on the projector. Students must use the <strong>UMU Present</strong> app to scan. Attendance records are synced in real-time with the Faculty Admin portal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}