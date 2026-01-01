import type { Admin, Faculty, SystemStats, CourseStats, ActivityLog } from '../types/admin';
import { mockStudents, mockAttendanceRecords } from './mockStudentData';
import { mockLecturers, mockCourses, mockQRCodeSessions } from './mockLecturerData';

// Faculty Mock Data
export const mockFaculties: Faculty[] = [
  {
    id: 'science',
    name: 'Faculty of Science',
    domain: 'science',
    deanId: 'LEC001'
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    domain: 'education',
    deanId: 'LEC002'
  },
  {
    id: 'business',
    name: 'Faculty of Business Administration and Management',
    domain: 'business',
    deanId: 'LEC003'
  },
  {
    id: 'health',
    name: 'Faculty of Health Sciences',
    domain: 'health',
    deanId: 'LEC004'
  },
  {
    id: 'arts',
    name: 'Faculty of Arts and Social Sciences',
    domain: 'arts',
    deanId: 'LEC005'
  }
];

// Admin Mock Data
export const mockAdmins: Admin[] = [
  {
    id: 'ADM001',
    name: 'System Administrator',
    email: 'admin@umu.ac.ug',
    role: 'super_admin',
    permissions: ['all'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM002',
    name: 'Science Faculty Admin',
    email: 'science.admin@umu.ac.ug',
    role: 'faculty_admin',
    facultyId: 'science',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM003',
    name: 'Education Faculty Admin',
    email: 'education.admin@umu.ac.ug',
    role: 'faculty_admin',
    facultyId: 'education',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM004',
    name: 'Business Faculty Admin',
    email: 'business.admin@umu.ac.ug',
    role: 'faculty_admin',
    facultyId: 'business',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM005',
    name: 'Health Sciences Faculty Admin',
    email: 'health.admin@umu.ac.ug',
    role: 'faculty_admin',
    facultyId: 'health',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ADM006',
    name: 'Arts Faculty Admin',
    email: 'arts.admin@umu.ac.ug',
    role: 'faculty_admin',
    facultyId: 'arts',
    permissions: ['manage_users', 'view_reports', 'manage_courses', 'approve_registrations'],
    isApproved: true,
    createdAt: new Date().toISOString()
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    userId: 'STU001',
    userType: 'student',
    action: 'attendance_marked',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    details: 'Marked present for CS101'
  },
  {
    id: 'LOG002',
    userId: 'LEC001',
    userType: 'lecturer',
    action: 'qr_generated',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    details: 'Generated QR code for CS101'
  },
  {
    id: 'LOG003',
    userId: 'ADM001',
    userType: 'admin',
    action: 'user_created',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    details: 'Created new student account'
  }
];

// Admin Helper Functions
export const getAdminById = (id: string): Admin | undefined => {
  return mockAdmins.find(admin => admin.id === id);
};

export const getSystemStats = (): SystemStats => {
  return {
    totalStudents: mockStudents.length,
    totalLecturers: mockLecturers.length,
    totalCourses: mockCourses.length,
    totalAttendanceRecords: mockAttendanceRecords.length,
    activeQRSessions: mockQRCodeSessions.filter(session => session.isActive).length,
    systemHealth: 'healthy' // In a real app, this would be calculated based on system metrics
  };
};

export const getCourseStats = (): CourseStats[] => {
  return mockCourses.map(course => {
    const courseAttendance = mockAttendanceRecords.filter(record =>
      record.subject.toLowerCase().includes(course.code.toLowerCase())
    );

    const totalClasses = course.schedule.length * 4; // Assuming 4 weeks per month
    const presentCount = courseAttendance.filter(record => record.status === 'present').length;
    const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

    return {
      courseId: course.id,
      courseName: course.name,
      totalStudents: mockStudents.filter(student =>
        student.course.toLowerCase().includes(course.department.toLowerCase()) ||
        course.department.toLowerCase().includes(student.course.toLowerCase())
      ).length,
      averageAttendance: attendanceRate,
      totalClasses,
      attendanceRate
    };
  });
};

export const getRecentActivity = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>): void => {
  const newLog: ActivityLog = {
    ...log,
    id: `LOG${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  mockActivityLogs.unshift(newLog);
};

// Re-export from mockLecturerData for convenience
export { mockCourses, mockLecturers } from './mockLecturerData';
