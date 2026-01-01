import React, { useState } from 'react';
import { 
  Search, UserPlus, Mail, Fingerprint, 
  MoreHorizontal, Edit3, Trash2, 
  GraduationCap, Briefcase, ShieldCheck, Filter
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockStudents } from '../../data/mockStudentData';
import { mockLecturers } from '../../data/mockLecturerData';
import { mockAdmins } from '../../data/mockAdminData';
import type { Student } from '../../types/student';
import type { Lecturer } from '../../types/lecturer';
import type { Admin } from '../../types/admin';
import AddUserModal from '../../components/modals/AddUserModal';
import Button from '../../components/common/Button';

type UserTab = 'students' | 'lecturers' | 'admins';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const tabs: { id: UserTab; label: string; count: number; icon: any }[] = [
    { id: 'students', label: 'Students', count: mockStudents.length, icon: GraduationCap },
    { id: 'lecturers', label: 'Lecturers', count: mockLecturers.length, icon: Briefcase },
    { id: 'admins', label: 'Admins', count: mockAdmins.length, icon: ShieldCheck }
  ];

  const handleUserCreated = () => {
    // Refresh the UI - in a real app, this would refetch from API
    setShowAddUserModal(false);
  };

  const getFilteredUsers = () => {
    let users: (Student | Lecturer | Admin)[] = [];
    if (activeTab === 'students') users = mockStudents;
    else if (activeTab === 'lecturers') users = mockLecturers;
    else users = mockAdmins;

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.id.toLowerCase().includes(term)
    );
  };

  const getRoleBranding = (tab: UserTab) => {
    switch (tab) {
      case 'students': return { color: 'text-[#006838]', bg: 'bg-[#006838]/10' };
      case 'lecturers': return { color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'admins': return { color: 'text-purple-600', bg: 'bg-purple-50' };
    }
  };

  return (
    <div className="pb-12 space-y-8">
      {/* 1. Interactive Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Identity Directory</h1>
          <p className="mt-1 font-medium text-slate-500">Manage credentials and access levels for the UMU community.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006838] transition-colors" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#006838]/5 focus:border-[#006838] outline-none w-full md:w-72 transition-all font-medium"
              />
           </div>
           <Button 
            onClick={() => setShowAddUserModal(true)}
            className="bg-[#006838] hover:bg-[#004d2a] text-white h-[52px] px-6 shadow-lg shadow-[#006838]/20"
           >
             <UserPlus size={20} className="mr-2" />
             Add {activeTab.slice(0, -1)}
           </Button>
        </div>
      </div>

      {/* 2. Glass Navigation Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-[24px] w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const branding = getRoleBranding(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-[20px] transition-all duration-300 ${
                isActive ? 'bg-white shadow-sm scale-100' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} className={isActive ? branding.color : ''} />
              <span className={`text-sm font-black uppercase tracking-widest ${isActive ? 'text-slate-900' : ''}`}>
                {tab.label}
              </span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${isActive ? branding.bg + ' ' + branding.color : 'bg-slate-200 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. User Registry Table */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-slate-50/50 border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department/Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {getFilteredUsers().map((user) => {
                const branding = getRoleBranding(activeTab);
                return (
                  <tr key={user.id} className="transition-colors group hover:bg-slate-50/30">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${branding.bg} ${branding.color} rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white`}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{user.name}</div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">
                          {activeTab === 'students' && 'course' in user && user.course}
                          {activeTab === 'lecturers' && 'department' in user && user.department}
                          {activeTab === 'admins' && 'role' in user && user.role.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                          <Fingerprint size={10} /> {user.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status="success">Active</StatusBadge>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 text-slate-400 hover:text-[#006838] hover:bg-[#006838]/5 rounded-xl transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2.5 text-slate-300 hover:text-slate-600">
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

        {getFilteredUsers().length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-50 text-slate-200">
              <Filter size={32} />
            </div>
            <p className="font-bold text-slate-500">No academic identities match your search filters.</p>
          </div>
        )}
      </div>

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserCreated={handleUserCreated}
        userType={activeTab === 'admins' ? 'admin' : activeTab === 'lecturers' ? 'lecturer' : 'student'}
      />
    </div>
  );
};

export default Users;