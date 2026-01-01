import { useState } from 'react';
import { 
  User, BookOpen, Zap, Calendar, 
  MapPin, Clock, ChevronRight, 
  AlertCircle, LayoutDashboard, History
} from 'lucide-react';
import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import QRCodeGenerator from "../../components/common/QRCodeGenerator";
import { getCoursesByLecturerId, getActiveQRSessions, type QRCodeSession } from "../../data/mockLecturerData";
import { getCurrentLecturer } from "../../data/authService";

export default function LecturerDashboard() {
  const currentLecturer = getCurrentLecturer();
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];
  const activeSessions = getActiveQRSessions();
  const [recentSessions, setRecentSessions] = useState<QRCodeSession[]>([]);

  const handleQRGenerated = (session: QRCodeSession) => {
    setRecentSessions(prev => [session, ...prev.slice(0, 4)]);
  };

  if (!currentLecturer) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-6 text-red-500 shadow-xl bg-red-50 rounded-3xl shadow-red-500/10">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Lecturer Identity Lost</h2>
          <p className="mt-2 font-medium text-slate-500">Please re-authenticate to access the academic portal.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="pb-20 mx-auto space-y-10 max-w-7xl">
        
        {/* 1. Immersive Hero Section */}
        <div className="relative overflow-hidden bg-[#006838] rounded-[40px] p-8 md:p-12 shadow-2xl shadow-[#006838]/20 group">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F9A825]/20 rounded-full blur-[80px] -ml-32 -mb-32" />

          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Academic Session Active
              </div>
              <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Hello, Prof. {currentLecturer.name.split(' ')[1]}
              </h1>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  { icon: User, text: currentLecturer.employeeId },
                  { icon: LayoutDashboard, text: currentLecturer.department },
                  { icon: BookOpen, text: `${courses.length} Active Courses` }
                ].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white border bg-white/10 backdrop-blur-lg rounded-2xl border-white/10">
                    <tag.icon size={14} className="text-[#F9A825]" />
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform">
               <User size={64} className="text-white/20" />
            </div>
          </div>
        </div>

        {/* 2. Quick Vitals Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: 'Managed Modules', val: courses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active QR Streams', val: activeSessions.length, icon: Zap, color: 'text-[#006838]', bg: 'bg-green-50' },
            { label: 'Scheduled Today', val: courses.reduce((t, c) => t + c.schedule.length, 0), icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. The Generator Engine */}
        <div className="relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-[#006838] rounded-full hidden lg:block" />
          <QRCodeGenerator
            lecturerId={currentLecturer.id}
            onQRGenerated={handleQRGenerated}
          />
        </div>

        {/* 4. Data Streams: Recent Sessions & Courses */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          
          {/* Recent QR Activity */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-slate-50">
              <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                <History className="text-[#006838]" size={24} /> Stream History
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {recentSessions.length > 0 ? recentSessions.map((session) => (
                <div key={session.id} className="p-6 transition-colors hover:bg-slate-50 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                      <div>
                        <h4 className="font-black text-slate-900 group-hover:text-[#006838] transition-colors">{session.courseName}</h4>
                        <p className="flex items-center gap-2 mt-1 text-xs font-bold tracking-tighter uppercase text-slate-400">
                          <MapPin size={10} /> {session.location} • <Clock size={10} /> {session.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${session.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        {session.isActive ? 'Live' : 'Expired'}
                      </div>
                      <p className="text-[10px] font-bold text-slate-300 mt-2">{new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-12 font-medium text-center text-slate-400">No recent sessions found.</div>
              )}
            </div>
          </div>

          {/* Module Registry */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-slate-50">
              <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                <BookOpen className="text-[#F9A825]" size={24} /> My Modules
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-6 transition-all cursor-pointer group hover:bg-slate-50">
                  <div>
                    <span className="text-[9px] font-black text-[#F9A825] uppercase tracking-[0.2em]">{course.code}</span>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-[#006838] transition-colors">{course.name}</h4>
                    <div className="flex gap-1.5 mt-3">
                      {course.schedule.map((s) => (
                        <span key={s.id} className="px-2.5 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded-lg uppercase">
                          {s.day.slice(0,3)} {s.time}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight size={20} className="transition-colors text-slate-200 group-hover:text-slate-900" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}