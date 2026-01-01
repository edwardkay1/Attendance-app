import { useState } from 'react';
import { 
  QrCode, User, Calendar, CheckCircle, 
  TrendingUp, Clock, ChevronRight, 
  LayoutDashboard, Bell, X 
} from 'lucide-react';
import PageWrapper from "../../components/layout/student/PageWrapper";
import AttendanceScanner from "../../components/common/AttendanceScanner";
import { getStudentStats, getStudentAttendanceRecords } from "../../data/mockStudentData";
import { getCurrentStudent } from "../../data/authService";

export default function StudentDashboard() {
  const currentStudent = getCurrentStudent();
  const stats = currentStudent ? getStudentStats(currentStudent.id) : null;
  const recentRecords = currentStudent ? getStudentAttendanceRecords(currentStudent.id).slice(0, 3) : [];

  const [showScanner, setShowScanner] = useState(false);
  const [lastMarked, setLastMarked] = useState<string | null>(null);

  const handleAttendanceMarked = (_qrData: string) => {
    setLastMarked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setShowScanner(false);
    // Real logic would include a toast notification here
  };

  if (!currentStudent || !stats) return null;

  return (
    <PageWrapper>
      <div className="pb-20 mx-auto space-y-10 max-w-7xl">
        
        {/* 1. Profile Hero Section */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[40px] p-8 md:p-12 shadow-2xl group">
          {/* Decorative Glass Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006838]/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] -ml-24 -mb-24" />

          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Hi, {currentStudent.name.split(' ')[0]}! 👋
              </h1>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white border bg-white/10 backdrop-blur-lg rounded-2xl border-white/10">
                  <User size={14} className="text-[#F9A825]" /> {currentStudent.studentId}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white border bg-white/10 backdrop-blur-lg rounded-2xl border-white/10">
                  <LayoutDashboard size={14} className="text-blue-400" /> {currentStudent.course}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white border bg-white/10 backdrop-blur-lg rounded-2xl border-white/10">
                  <Calendar size={14} className="text-green-400" /> Year {currentStudent.year}
                </span>
              </div>
            </div>
            
            <div className="flex-col items-center hidden gap-2 md:flex">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-[30px] border border-white/20 flex items-center justify-center shadow-inner">
                <Bell size={32} className="text-white/40" />
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">No Alerts</p>
            </div>
          </div>
        </div>

        {/* 2. Attendance Action Hub */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Scanner Trigger */}
          <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-[40px] p-8 md:p-10 shadow-xl shadow-[#006838]/20 flex flex-col md:flex-row items-center gap-8 group">
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-2 text-2xl font-black text-white">Class Attendance</h3>
              <p className="mb-6 text-sm font-medium leading-relaxed text-white/70">
                Scan your lecturer's QR code to verify your presence for the current session.
              </p>
              {lastMarked && (
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-bold text-white bg-white/20 rounded-xl">
                  <CheckCircle size={14} /> Last Marked: {lastMarked}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="w-full md:w-auto h-20 px-10 bg-white rounded-[24px] shadow-2xl shadow-black/20 flex items-center justify-center gap-4 hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#006838]/10 rounded-xl flex items-center justify-center text-[#006838]">
                <QrCode size={28} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-[#006838] uppercase tracking-widest leading-none">Tap to scan</p>
                <p className="mt-1 text-xl font-black text-slate-900">Check In</p>
              </div>
            </button>
          </div>

          {/* Compliance Meter */}
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="relative flex items-center justify-center w-24 h-24 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * stats.attendanceRate) / 100} className="text-[#006838] transition-all duration-1000 ease-out" />
              </svg>
              <span className="absolute text-xl font-black text-slate-900">{stats.attendanceRate}%</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Rate</p>
            <h4 className="text-sm font-black uppercase text-slate-900">Compliance Score</h4>
          </div>
        </div>

        {/* 3. Detailed Vitals & Activity */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Sessions', val: stats.totalClasses, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Present', val: stats.presentCount, icon: CheckCircle, color: 'text-[#006838]', bg: 'bg-green-50' },
            { label: 'Absences', val: stats.absentCount, icon: X, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Academic Standing', val: 'Good', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
              <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>
                <s.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <p className="text-xl font-black leading-none text-slate-900">{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Recent Logs */}
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-slate-50">
            <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
              <Clock className="text-[#006838]" size={24} /> Recent Logs
            </h3>
            <button className="text-xs font-black text-[#006838] uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
              Full History <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 group">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:border-[#006838]/20 transition-colors`}>
                    <span className="text-[9px] font-black text-[#006838] uppercase">{new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-lg font-black text-slate-900 leading-none mt-0.5">{new Date(record.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#006838] transition-colors">{record.subject}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mt-1">
                      <User size={10} /> {record.lecturer} • <Clock size={10} /> {record.time}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  record.status === 'present' ? 'bg-green-50 text-green-600' : 
                  record.status === 'absent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {record.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 duration-300 bg-slate-900/60 backdrop-blur-xl animate-in fade-in" onClick={() => setShowScanner(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-8 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900">Scan Session QR</h3>
              <button onClick={() => setShowScanner(false)} className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-slate-50 text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <AttendanceScanner
                onAttendanceMarked={handleAttendanceMarked}
                onClose={() => setShowScanner(false)}
              />
              <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                Align QR Code within the frame
              </p>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}