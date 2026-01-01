import { useState } from 'react';
import { 
  UserCheck, Users, Clock, 
  Calendar, BookOpen, Check, X, 
  MinusCircle, Filter, Search, MoreHorizontal
} from 'lucide-react';
import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import { getCoursesByLecturerId } from "../../data/mockLecturerData";
import { getCurrentLecturer } from "../../data/authService";
import { mockStudents, mockAttendanceRecords } from "../../data/mockStudentData";
import type { Course } from "../../types/lecturer";

export default function LecturerMarkAttendance() {
  const currentLecturer = getCurrentLecturer();
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const courseStudents = selectedCourse
    ? mockStudents.filter(student => student.course === selectedCourse.name.split(' ')[0])
    : [];

  const filteredStudents = courseStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const courseAttendance = selectedCourse
    ? mockAttendanceRecords.filter(record =>
        record.subject.toLowerCase().includes(selectedCourse.code.toLowerCase()) &&
        record.date === selectedDate
      )
    : [];

  const stats = {
    total: courseStudents.length,
    present: courseAttendance.filter(r => r.status === 'present').length,
    absent: courseAttendance.filter(r => r.status === 'absent').length,
    late: courseAttendance.filter(r => r.status === 'late').length
  };

  if (!currentLecturer) return null;

  return (
    <PageWrapper>
      <div className="pb-20 mx-auto space-y-8 max-w-7xl">
        
        {/* 1. Dashboard Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#006838]">
              <UserCheck size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Manual Override Portal</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Register Management</h1>
            <p className="mt-1 font-medium text-slate-500">Select a course and date to verify student presence manually.</p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center gap-2 p-2 bg-white border shadow-sm border-slate-100 rounded-2xl">
              <BookOpen size={16} className="ml-3 text-slate-400" />
              <select
                value={selectedCourse?.id}
                onChange={(e) => setSelectedCourse(courses.find(c => c.id === e.target.value) || null)}
                className="pr-10 text-sm font-bold bg-transparent border-none text-slate-700 focus:ring-0"
              >
                {courses.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white border shadow-sm border-slate-100 rounded-2xl">
              <Calendar size={16} className="ml-3 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm font-bold bg-transparent border-none text-slate-700 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* 2. Live Vitals Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Enrolled', val: stats.total, color: 'text-blue-600', bg: 'bg-blue-50', icon: Users },
            { label: 'Present', val: stats.present, color: 'text-[#006838]', bg: 'bg-green-50', icon: Check },
            { label: 'Absent', val: stats.absent, color: 'text-red-600', bg: 'bg-red-50', icon: X },
            { label: 'Late', val: stats.late, color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col items-center text-center">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={20} />
              </div>
              <p className="text-2xl font-black leading-none text-slate-900">{s.val}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 3. Student List Container */}
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
          <div className="flex flex-col justify-between gap-4 p-8 border-b border-slate-50 md:flex-row md:items-center bg-slate-50/30">
            <h3 className="text-lg font-black text-slate-900">Class Roster</h3>
            <div className="relative w-full group md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#006838] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] transition-all outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Student Info</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((student) => {
                  const record = courseAttendance.find(r => r.studentId === student.id);
                  return (
                    <tr key={student.id} className="transition-colors group hover:bg-slate-50/30">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-[#006838]/10 group-hover:text-[#006838] transition-all duration-500">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{student.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{student.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {record ? (
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            record.status === 'present' ? 'bg-green-50 text-green-600' :
                            record.status === 'absent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              record.status === 'present' ? 'bg-green-600' :
                              record.status === 'absent' ? 'bg-red-600' : 'bg-amber-600'
                            }`} />
                            {record.status}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-300 text-[10px] font-black uppercase tracking-widest italic">
                            <MinusCircle size={14} /> Unmarked
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all">Present</button>
                          <button className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">Absent</button>
                          <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-50 text-slate-200">
                <Filter size={32} />
              </div>
              <p className="font-bold text-slate-500">No students found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}