import { 
  Calendar, CheckCircle, XCircle, 
  TrendingUp, Clock, User, 
  Filter
} from 'lucide-react';
import PageWrapper from "../../components/layout/student/PageWrapper";
import { getStudentById, getStudentStats, getStudentAttendanceRecords } from "../../data/mockStudentData";

export default function StudentAttendance() {
  const currentStudent = getStudentById('1');
  const stats = currentStudent ? getStudentStats(currentStudent.id) : null;
  const attendanceRecords = currentStudent ? getStudentAttendanceRecords(currentStudent.id) : [];

  if (!currentStudent || !stats) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-6 bg-slate-50 rounded-3xl">
            <User size={40} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Identity Not Found</h2>
          <p className="mt-2 font-medium text-slate-500">Please sign in to view your academic records.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="pb-20 mx-auto space-y-10 max-w-7xl">
        
        {/* 1. Immersive Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#006838]">
              <Calendar size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Academic Year 2025/26</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Attendance Ledger</h1>
            <p className="mt-1 font-medium text-slate-500">Official record of your presence in scheduled academic sessions.</p>
          </div>
          
          
        </div>

        {/* 2. Compliance Vitals Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Classes Logged', val: stats.totalClasses, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Verified Present', val: stats.presentCount, icon: CheckCircle, color: 'text-[#006838]', bg: 'bg-green-50' },
            { label: 'Missed Sessions', val: stats.absentCount, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Compliance Rate', val: `${stats.attendanceRate}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-black leading-none text-slate-900">{stat.val}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 3. Detailed Attendance Registry */}
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
          <div className="flex flex-col justify-between gap-4 p-8 border-b border-slate-50 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-slate-900">Session History</h3>
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">
                {attendanceRecords.length} Entries
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl">
              <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">All Modules</button>
              <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Exceptions Only</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Schedule</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Detail</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lecturer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="transition-colors group hover:bg-slate-50/30">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-[#006838]/5 group-hover:border-[#006838]/20 transition-colors">
                          <span className="text-[10px] font-black text-[#006838] leading-none uppercase">
                            {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="mt-1 text-sm font-black leading-none text-slate-900">
                            {new Date(record.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={10} /> {record.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-700">{record.subject}</p>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Undergraduate Core</p>
                    </td>
                    <td className="px-8 py-5">
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
                    </td>
                    <td className="px-8 py-5 text-right">
                       <p className="text-xs font-bold text-slate-900">{record.lecturer}</p>
                       <p className="text-[10px] font-bold text-slate-400">Authorized Signatory</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {attendanceRecords.length === 0 && (
            <div className="py-20 text-center">
               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-50 text-slate-200">
                 <Filter size={32} />
               </div>
               <p className="font-bold text-slate-500">No attendance logs found for this period.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}