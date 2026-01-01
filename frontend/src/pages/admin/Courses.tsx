import React, { useState } from 'react';
import { Search, Plus, BookOpen, Users, TrendingUp, AlertCircle, Calendar, MoreHorizontal } from 'lucide-react';
import { mockCourses, mockLecturers } from '../../data/mockAdminData';
import Button from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { Course, CourseSchedule } from '../../types/lecturer';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock course stats - in a real app this would come from an API
  const getCourseStats = () => [
    { courseId: '1', totalStudents: 45, averageAttendance: 85 },
    { courseId: '2', totalStudents: 32, averageAttendance: 78 },
    { courseId: '3', totalStudents: 28, averageAttendance: 92 },
    { courseId: '4', totalStudents: 51, averageAttendance: 67 },
  ];

  const courseStats = getCourseStats();

  const getLecturerName = (lecturerId: string) => {
    const lecturer = mockLecturers.find((l: any) => l.id === lecturerId);
    return lecturer ? lecturer.name : 'Unknown';
  };

  const getFilteredCourses = () => {
    const term = searchTerm.toLowerCase();
    return mockCourses.filter((course: Course) =>
      course.name.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term) ||
      getLecturerName(course.lecturerId).toLowerCase().includes(term)
    );
  };

  const getCourseStatsById = (courseId: string) => courseStats.find(stat => stat.courseId === courseId);

  return (
    <div className="pb-12 space-y-8">
      {/* 1. Dynamic Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Academic Registry</h1>
          <p className="font-medium text-slate-500">Monitoring {mockCourses.length} active courses across all faculties.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838] transition-colors" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find course or lecturer..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] outline-none w-full md:w-80 transition-all font-medium"
              />
           </div>
           <Button variant="primary" className="bg-[#006838] hover:bg-[#004d2a] shadow-lg shadow-[#006838]/20 h-[50px] px-6">
             <Plus size={20} className="mr-2" />
             New Course
           </Button>
        </div>
      </div>

      {/* 2. System Pulse - Floating Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {[
          { label: 'Active Courses', val: mockCourses.length, icon: BookOpen, col: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Enrollments', val: courseStats.reduce((s, st) => s + st.totalStudents, 0), icon: Users, col: 'text-[#006838]', bg: 'bg-[#006838]/5' },
          { label: 'Avg Attendance', val: `${Math.round(courseStats.reduce((s, st) => s + st.averageAttendance, 0) / courseStats.length)}%`, icon: TrendingUp, col: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'At Risk', val: courseStats.filter(s => s.averageAttendance < 75).length, icon: AlertCircle, col: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={`w-12 h-12 ${stat.bg} ${stat.col} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. The Grid Stage */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {getFilteredCourses().map((course: Course) => {
          const stats = getCourseStatsById(course.id);
          return (
            <div key={course.id} className="group relative bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#006838]/5 rounded-full blur-2xl group-hover:bg-[#F9A825]/10 transition-colors" />

              <div className="flex items-start justify-between mb-6">
                <div className="max-w-[70%]">
                  <span className="text-[10px] font-black text-[#F9A825] uppercase tracking-widest">{course.code}</span>
                  <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#006838] transition-colors truncate">{course.name}</h3>
                </div>
                <StatusBadge status="success">Live</StatusBadge>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-400"><Users size={16} /></div>
                  <span className="text-sm font-bold">{getLecturerName(course.lecturerId)}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mt-0.5"><Calendar size={16} /></div>
                  <div className="text-xs font-medium leading-relaxed">
                    {course.schedule.map((s: CourseSchedule, idx: number) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="font-bold text-slate-900">{s.day}</span> @ {s.time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {stats && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 border bg-slate-50 rounded-2xl border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Enrolled</p>
                    <p className="text-lg font-black text-slate-900">{stats.totalStudents}</p>
                  </div>
                  <div className="p-3 border bg-slate-50 rounded-2xl border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Avg Att.</p>
                    <p className={`text-lg font-black ${stats.averageAttendance < 75 ? 'text-orange-500' : 'text-[#006838]'}`}>
                      {stats.averageAttendance}%
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="primary" className="flex-1 text-xs font-black tracking-widest text-white uppercase bg-slate-900 rounded-xl h-11">
                  Configure
                </Button>
                <button className="flex items-center justify-center transition-colors w-11 h-11 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {getFilteredCourses().length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[40px]">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100 text-slate-300">
            <Search size={32} />
          </div>
          <p className="font-bold tracking-tight text-slate-500">No academic records match your query.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;