import type { Lecturer, Course, CourseSchedule, QRCodeSession } from '../types/lecturer';

// Re-export types for convenience
export type { Course, CourseSchedule, QRCodeSession };

// Mock Lecturer Data
export const mockLecturers: Lecturer[] = [
  {
    id: 'LEC001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@umu.ac.ug',
    department: 'Computer Science',
    employeeId: 'EMP001',
    facultyId: 'science',
    courses: ['CS101', 'CS201'],
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LEC002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@umu.ac.ug',
    department: 'Mathematics',
    employeeId: 'EMP002',
    facultyId: 'science',
    courses: ['MATH201', 'MATH301'],
    isApproved: true,
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'LEC003',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@umu.ac.ug',
    department: 'Physics',
    employeeId: 'EMP003',
    facultyId: 'science',
    courses: ['PHY101', 'PHY201'],
    isApproved: true,
    createdAt: '2024-01-17T10:00:00Z'
  }
];

export const mockCourses: Course[] = [
  {
    id: 'CS101',
    name: 'Introduction to Programming',
    code: 'CS101',
    department: 'Computer Science',
    facultyId: 'science',
    lecturerId: 'LEC001',
    schedule: [
      {
        id: 'SCH001',
        day: 'Monday',
        time: '09:00',
        location: 'Room 101',
        duration: 90
      },
      {
        id: 'SCH002',
        day: 'Wednesday',
        time: '09:00',
        location: 'Room 101',
        duration: 90
      }
    ],
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'MATH201',
    name: 'Advanced Calculus',
    code: 'MATH201',
    department: 'Mathematics',
    facultyId: 'science',
    lecturerId: 'LEC002',
    schedule: [
      {
        id: 'SCH003',
        day: 'Tuesday',
        time: '11:00',
        location: 'Room 203',
        duration: 120
      },
      {
        id: 'SCH004',
        day: 'Thursday',
        time: '11:00',
        location: 'Room 203',
        duration: 120
      }
    ],
    isApproved: true,
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'PHY101',
    name: 'Physics Fundamentals',
    code: 'PHY101',
    department: 'Physics',
    facultyId: 'science',
    lecturerId: 'LEC003',
    schedule: [
      {
        id: 'SCH005',
        day: 'Monday',
        time: '14:00',
        location: 'Lab 5',
        duration: 120
      },
      {
        id: 'SCH006',
        day: 'Friday',
        time: '14:00',
        location: 'Lab 5',
        duration: 120
      }
    ],
    isApproved: true,
    createdAt: '2024-01-17T10:00:00Z'
  }
];

export const mockQRCodeSessions: QRCodeSession[] = [
  {
    id: 'QR001',
    courseId: 'CS101',
    courseName: 'Introduction to Programming',
    lecturerId: 'LEC001',
    lecturerName: 'Dr. Sarah Johnson',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    location: 'Room 101',
    qrData: 'attendance:CS101:2024-01-15:09:00:LEC001:Room101',
    isActive: true,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 60 * 1000).toISOString() // 90 minutes from now
  }
];

// Helper functions for lecturers
export const getLecturerById = (id: string): Lecturer | undefined => {
  return mockLecturers.find(lecturer => lecturer.id === id);
};

export const getCoursesByLecturerId = (lecturerId: string): Course[] => {
  return mockCourses.filter(course => course.lecturerId === lecturerId);
};

export const getActiveQRSessions = (): QRCodeSession[] => {
  return mockQRCodeSessions.filter(session => session.isActive);
};

export const generateQRCodeData = (courseId: string, lecturerId: string, date: string, time: string, location: string): string => {
  return `attendance:${courseId}:${date}:${time}:${lecturerId}:${location}`;
};

export const createQRSession = (course: Course, lecturer: Lecturer, schedule: CourseSchedule): QRCodeSession => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const qrData = generateQRCodeData(course.id, lecturer.id, date, schedule.time, schedule.location);

  const session: QRCodeSession = {
    id: `QR${Date.now()}`,
    courseId: course.id,
    courseName: course.name,
    lecturerId: lecturer.id,
    lecturerName: lecturer.name,
    date,
    time: schedule.time,
    location: schedule.location,
    qrData,
    isActive: true,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + schedule.duration * 60 * 1000).toISOString()
  };

  mockQRCodeSessions.push(session);
  return session;
};
