import PageWrapper from "../../components/layout/student/PageWrapper";
import AttendanceScanner from "../../components/common/AttendanceScanner";
import { getStudentStats, getStudentAttendanceRecords } from "../../data/mockStudentData";
import { getCurrentStudent } from "../../data/authService";
import { useState } from "react";

export default function StudentDashboard() {
  // Get the current authenticated student
  const currentStudent = getCurrentStudent();
  const stats = currentStudent ? getStudentStats(currentStudent.id) : null;
  const recentRecords = currentStudent ? getStudentAttendanceRecords(currentStudent.id).slice(0, 3) : [];

  const [showScanner, setShowScanner] = useState(false);
  const [lastAttendanceMarked, setLastAttendanceMarked] = useState<string | null>(null);

  const handleAttendanceMarked = (qrData: string) => {
    // In a real app, this would send the data to the backend
    console.log('Attendance marked with QR data:', qrData);
    setLastAttendanceMarked(new Date().toLocaleString());
    setShowScanner(false);

    // Show success message (you could add a toast notification here)
    alert('Attendance marked successfully! 🎉');
  };

  if (!currentStudent || !stats) {
    return (
      <PageWrapper>
        <div className="py-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-lg text-gray-600">Student data not found</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-8 text-white shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">Welcome back, {currentStudent.name.split(' ')[0]}! 👋</h1>
              <p className="text-lg text-blue-100">Here's your attendance overview for today</p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {currentStudent.studentId}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {currentStudent.course}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  Year {currentStudent.year}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Total Classes</p>
                <p className="mt-1 text-3xl font-bold">{stats.totalClasses}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Present</p>
                <p className="mt-1 text-3xl font-bold">{stats.presentCount}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-red-500 to-red-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-100">Absent</p>
                <p className="mt-1 text-3xl font-bold">{stats.absentCount}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Attendance Rate</p>
                <p className="mt-1 text-3xl font-bold">{stats.attendanceRate}%</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mark Attendance Card */}
        <div className="p-8 text-white shadow-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-bold">Ready to mark attendance? </h3>
              <p className="mb-4 text-green-100">Scan the QR code provided by your lecturer to mark your attendance for today's class.</p>
              {lastAttendanceMarked && (
                <p className="text-sm text-green-200">
                  ✓ Last marked: {lastAttendanceMarked}
                </p>
              )}
            </div>
            <div className="ml-6">
              <button
                onClick={() => setShowScanner(true)}
                className="flex items-center px-8 py-4 space-x-3 font-semibold text-green-600 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:bg-green-50 hover:scale-105 hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12l3-3m-3 3l-3-3m-3 7h2.99M9 12H5m0 0v4" />
                </svg>
                <span>Scan QR Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
            <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
              Last 3 classes
            </span>
          </div>
          <div className="space-y-4">
            {recentRecords.map((record, index) => (
              <div key={record.id} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    record.status === 'present'
                      ? 'bg-green-100'
                      : record.status === 'absent'
                      ? 'bg-red-100'
                      : 'bg-yellow-100'
                  }`}>
                    <span className="text-xl">
                      {record.status === 'present' ? '✅' : record.status === 'absent' ? '❌' : '⏰'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{record.subject}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })} • {record.time} • {record.lecturer}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  record.status === 'present'
                    ? 'bg-green-100 text-green-800'
                    : record.status === 'absent'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Scanner Modal */}
      {showScanner && (
        <AttendanceScanner
          onAttendanceMarked={handleAttendanceMarked}
          onClose={() => setShowScanner(false)}
        />
      )}
    </PageWrapper>
  );
}

