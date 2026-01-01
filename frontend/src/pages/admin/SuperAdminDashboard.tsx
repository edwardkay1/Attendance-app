import React, { useState } from 'react';
import { 
  ShieldAlert, Landmark, Users,
  Settings, Plus, Globe,
  ToggleLeft, ToggleRight, MoreVertical 
} from 'lucide-react';
import { mockFaculties, mockAdmins } from '../../data/mockAdminData';
import type { Faculty, Admin } from '../../types/admin';
import AddUserModal from '../../components/modals/AddUserModal';
import Button from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

const SuperAdminDashboard: React.FC = () => {
  const [faculties] = useState<Faculty[]>(mockFaculties);
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const facultyAdmins = admins.filter(admin => admin.role === 'faculty_admin');
  const superAdmins = admins.filter(admin => admin.role === 'super_admin');

  const handleAdminCreated = () => {
    // Refresh the admins list - in a real app, this would refetch from API
    setAdmins([...admins]); // Trigger re-render
    setShowAddAdminModal(false);
  };

  const handleToggleAdminStatus = (adminId: string) => {
    setAdmins(prev => prev.map(admin =>
      admin.id === adminId ? { ...admin, isApproved: !admin.isApproved } : admin
    ));
  };

  return (
    <div className="pb-16 space-y-8">
      {/* 1. Global Command Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Root Level Access</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">UMU System Oversight</h1>
          <p className="font-medium text-slate-500">Global management of Uganda Martyrs University faculties, domains, and administrative tiering.</p>
        </div>
        <Button 
          onClick={() => setShowAddAdminModal(true)}
          className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[20px] shadow-xl shadow-slate-900/20"
        >
          <Plus size={20} className="mr-2" />
          Provision Faculty Admin
        </Button>
      </div>

      {/* 2. System Distribution - Glass Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: 'Total Faculties', val: faculties.length, icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Faculty Admins', val: facultyAdmins.length, icon: Users, color: 'text-[#006838]', bg: 'bg-[#006838]/5' },
          { label: 'Super Admins', val: superAdmins.length, icon: ShieldAlert, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[32px] shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black tracking-tighter text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Faculty Infrastructure Map */}
      <section>
        <div className="flex items-center justify-between px-2 mb-6">
          <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
            <Globe size={20} className="text-[#006838]" /> Faculty Domains
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faculties.map((faculty) => {
            const fAdmin = facultyAdmins.find(a => a.facultyId === faculty.id);
            return (
              <div key={faculty.id} className="group bg-white border border-slate-100 p-6 rounded-[30px] hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#006838] transition-colors">
                    <Landmark size={20} />
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg">
                    {faculty.domain}
                  </span>
                </div>
                <h4 className="mb-4 text-base font-black text-slate-900">{faculty.name}</h4>
                <div className="pt-4 space-y-3 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Faculty Admin</span>
                    <span className="text-xs font-bold text-slate-700">{fAdmin ? fAdmin.name : 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Administrative Tier List */}
      <section className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
          <h3 className="text-lg font-black text-slate-900">Access Control List</h3>
          <Settings size={20} className="text-slate-300" />
        </div>
        <div className="divide-y divide-slate-50">
          {admins.map((admin) => (
            <div key={admin.id} className="flex flex-col justify-between gap-4 p-6 transition-colors md:flex-row md:items-center hover:bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shadow-sm ${
                  admin.role === 'super_admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight text-slate-900">{admin.name}</h4>
                  <p className="text-xs font-medium text-slate-400">{admin.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  admin.role === 'super_admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {admin.role.replace('_', ' ')}
                </div>
                {admin.facultyId && (
                  <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase border border-slate-200">
                    {admin.facultyId}
                  </div>
                )}
                <StatusBadge status={admin.isApproved ? 'success' : 'danger'}>
                  {admin.isApproved ? 'Authorized' : 'Suspended'}
                </StatusBadge>
              </div>

              <div className="flex items-center gap-2 pl-6 border-l border-slate-100">
                <button
                  onClick={() => handleToggleAdminStatus(admin.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    admin.isApproved 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {admin.isApproved ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {admin.isApproved ? 'Revoke' : 'Grant'}
                </button>
                <button className="p-2 transition-colors text-slate-300 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AddUserModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onUserCreated={handleAdminCreated}
        userType="admin"
      />
    </div>
  );
};

export default SuperAdminDashboard;