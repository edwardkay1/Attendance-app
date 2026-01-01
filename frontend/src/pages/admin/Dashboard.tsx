import { useState } from 'react';
import { 
  Users, Briefcase, BookOpen, Smartphone, 
  Activity, ShieldCheck, Zap, Clock, 
  UserPlus, FileBarChart, QrCode, PlusCircle,
  ArrowUpRight, Search, X
} from 'lucide-react';
import { AttendanceStat } from '../../components/cards/AttendanceStat';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getSystemStats, getRecentActivity, getCourseStats } from '../../data/mockAdminData';
import AddUserModal from '../../components/modals/AddUserModal';
import CreateCourseModal from '../../components/modals/CreateCourseModal';
import ViewReportsModal from '../../components/modals/ViewReportsModal';
import QRScanner from '../../components/common/QRScanner';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  const systemStats = getSystemStats();
  const recentActivity = getRecentActivity(6);
  const courseStats = getCourseStats();

  const [modals, setModals] = useState({
    addUser: false, createCourse: false, viewReports: false, scanner: false,
  });

  const toggleModal = (key: keyof typeof modals, state: boolean) => {
    setModals(prev => ({ ...prev, [key]: state }));
  };

  return (
    <div className="pb-12 space-y-8">
      {/* 1. Integrated Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">System Command</h1>
          <p className="font-medium text-slate-500">Global overview of Uganda Martyrs University attendance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" onClick={() => toggleModal('viewReports', true)} className="border-slate-200">
            <FileBarChart size={18} className="mr-2" />
            Intelligence Reports
          </Button>
        </div>
      </div>

      {/* 2. Primary Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AttendanceStat title="Total Students" value={systemStats.totalStudents} icon={<Users size={20}/>} trend="+12%" trendUp={true} />
        <AttendanceStat title="Total Lecturers" value={systemStats.totalLecturers} icon={<Briefcase size={20}/>} trend="+2%" trendUp={true} />
        <AttendanceStat title="Active Courses" value={systemStats.totalCourses} icon={<BookOpen size={20}/>} trend="Stable" />
        <AttendanceStat title="Live Sessions" value={systemStats.activeQRSessions} icon={<Smartphone size={20}/>} trend="+8%" trendUp={true} />
      </div>

      {/* 3. System Vitality & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        
        {/* System Health Module */}
        <div className="xl:col-span-2 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006838]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-900">Infrastructure Health</h3>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Real-time performance</p>
            </div>
            <StatusBadge status={systemStats.systemHealth === 'healthy' ? 'success' : 'warning'}>
              System {systemStats.systemHealth}
            </StatusBadge>
          </div>

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { label: 'Total Records', val: systemStats.totalAttendanceRecords.toLocaleString(), icon: Activity, col: 'text-[#006838]' },
              { label: 'Service Uptime', val: '99.98%', icon: ShieldCheck, col: 'text-blue-600' },
              { label: 'Latency', val: '< 42ms', icon: Zap, col: 'text-[#F9A825]' },
            ].map((metric, i) => (
              <div key={i} className="p-5 border bg-slate-50/50 border-slate-100 rounded-2xl">
                <div className={`${metric.col} mb-3`}><metric.icon size={20} /></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{metric.label}</p>
                <p className="text-2xl font-black text-slate-900">{metric.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Commands Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quick Commands</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add User', icon: UserPlus, key: 'addUser', bg: 'bg-[#006838]', text: 'text-white' },
              { label: 'New Course', icon: PlusCircle, key: 'createCourse', bg: 'bg-slate-900', text: 'text-white' },
              { label: 'Audit Scan', icon: QrCode, key: 'scanner', bg: 'bg-white', text: 'text-slate-900' },
              { label: 'Find Data', icon: Search, key: 'viewReports', bg: 'bg-white', text: 'text-slate-900' },
            ].map((cmd) => (
              <button
                key={cmd.key}
                onClick={() => toggleModal(cmd.key as any, true)}
                className={`${cmd.bg} ${cmd.text} p-5 rounded-[24px] border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm hover:scale-[1.03] active:scale-95 transition-all group`}
              >
                <cmd.icon size={24} className="transition-transform group-hover:rotate-12" />
                <span className="text-[10px] font-black uppercase tracking-widest">{cmd.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Activity & Performance Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* Recent Audit Log */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">Audit Logs</h3>
            <Clock size={18} className="text-slate-300" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((log) => (
              <div key={log.id} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-[#006838]/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.userType === 'student' ? 'bg-[#006838]' : 'bg-[#F9A825]'}`} />
                  <div>
                    <p className="text-xs font-bold capitalize text-slate-900">{log.action.replace('_', ' ')}</p>
                    <p className="text-[10px] font-medium text-slate-500">{log.details}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">Course Ranks</h3>
            <ArrowUpRight size={18} className="text-slate-300" />
          </div>
          <div className="space-y-4">
            {courseStats.slice(0, 5).map((course) => (
              <div key={course.courseId} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-xs font-black text-slate-800">{course.courseName}</p>
                    <p className="text-xs font-black text-[#006838]">{course.averageAttendance}%</p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#006838] to-[#006838]/60 rounded-full transition-all duration-1000" 
                      style={{ width: `${course.averageAttendance}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals Mounting */}
      <AddUserModal isOpen={modals.addUser} onClose={() => toggleModal('addUser', false)} onUserCreated={() => {}} />
      <CreateCourseModal isOpen={modals.createCourse} onClose={() => toggleModal('createCourse', false)} onCourseCreated={() => {}} />
      <ViewReportsModal isOpen={modals.viewReports} onClose={() => toggleModal('viewReports', false)} />

      {/* Scanner Overlay */}
      {modals.scanner && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => toggleModal('scanner', false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] p-8 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">Admin Identity Scan</h3>
              <button onClick={() => toggleModal('scanner', false)} className="p-2 transition-colors rounded-full hover:bg-slate-100"><X size={20}/></button>
            </div>
            <div className="rounded-[32px] overflow-hidden border-4 border-slate-100 shadow-inner">
               <QRScanner isActive={modals.scanner} onScan={(res) => alert(res)} onError={() => {}} />
            </div>
            <p className="mt-6 text-xs font-bold tracking-widest text-center uppercase text-slate-400">Verifying Academic Credentials</p>
          </div>
        </div>
      )}
    </div>
  );
}