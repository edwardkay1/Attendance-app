import type{ Student, AttendanceRecord, StudentStats } from '../types/student';

// Student Mock Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@umu.ac.ug',
    studentId: 'STU001',
    course: 'Computer Science',
    year: 3,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@umu.ac.ug',
    studentId: 'STU002',
    course: 'Computer Science',
    year: 2,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie.brown@umu.ac.ug',
    studentId: 'STU003',
    course: 'Mathematics',
    year: 3,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    name: 'Diana Wilson',
    email: 'diana.wilson@umu.ac.ug',
    studentId: 'STU004',
    course: 'Physics',
    year: 2,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    name: 'Edward Davis',
    email: 'edward.davis@umu.ac.ug',
    studentId: 'STU005',
    course: 'Chemistry',
    year: 4,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'Fiona Garcia',
    email: 'fiona.garcia@umu.ac.ug',
    studentId: 'STU006',
    course: 'Biology',
    year: 3,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    name: 'George Miller',
    email: 'george.miller@umu.ac.ug',
    studentId: 'STU007',
    course: 'Engineering',
    year: 2,
    facultyId: 'science',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    name: 'Helen Taylor',
    email: 'helen.taylor@umu.ac.ug',
    studentId: 'STU008',
    course: 'Business',
    year: 3,
    facultyId: 'business',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    name: 'Ian Anderson',
    email: 'ian.anderson@umu.ac.ug',
    studentId: 'STU009',
    course: 'History',
    year: 4,
    facultyId: 'arts',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '10',
    name: 'Julia Martinez',
    email: 'julia.martinez@umu.ac.ug',
    studentId: 'STU010',
    course: 'Literature',
    year: 2,
    facultyId: 'arts',
    isApproved: true,
    createdAt: '2024-01-15T10:00:00Z'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  // Alice Johnson's records
  {
    id: '1',
    studentId: '1',
    subject: 'CS101',
    date: '2025-12-28',
    time: '09:00',
    status: 'present',
    lecturer: 'Dr. Smith',
  },
  {
    id: '2',
    studentId: '1',
    subject: 'CS101',
    date: '2025-12-27',
    time: '10:30',
    status: 'present',
    lecturer: 'Prof. Johnson',
  },
  {
    id: '3',
    studentId: '1',
    subject: 'CS101',
    date: '2025-12-26',
    time: '14:00',
    status: 'absent',
    lecturer: 'Dr. Brown',
  },

  // Bob Smith's records
  {
    id: '4',
    studentId: '2',
    subject: 'CS101',
    date: '2025-12-28',
    time: '09:00',
    status: 'present',
    lecturer: 'Dr. Smith',
  },
  {
    id: '5',
    studentId: '2',
    subject: 'CS101',
    date: '2025-12-27',
    time: '11:00',
    status: 'late',
    lecturer: 'Prof. Wilson',
  },

  // Charlie Brown's records
  {
    id: '6',
    studentId: '3',
    subject: 'MATH201',
    date: '2025-12-28',
    time: '08:00',
    status: 'present',
    lecturer: 'Dr. Davis',
  },
  {
    id: '7',
    studentId: '3',
    subject: 'MATH201',
    date: '2025-12-27',
    time: '13:00',
    status: 'present',
    lecturer: 'Prof. Garcia',
  },

  // Diana Wilson's records
  {
    id: '8',
    studentId: '4',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '10:00',
    status: 'present',
    lecturer: 'Dr. Miller',
  },
  {
    id: '9',
    studentId: '4',
    subject: 'PHY101',
    date: '2025-12-26',
    time: '15:00',
    status: 'absent',
    lecturer: 'Prof. Taylor',
  },

  // Edward Davis's records
  {
    id: '10',
    studentId: '5',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '09:30',
    status: 'present',
    lecturer: 'Dr. Anderson',
  },
  {
    id: '11',
    studentId: '5',
    subject: 'PHY101',
    date: '2025-12-27',
    time: '14:30',
    status: 'present',
    lecturer: 'Prof. Martinez',
  },

  // Fiona Garcia's records
  {
    id: '12',
    studentId: '6',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '11:00',
    status: 'present',
    lecturer: 'Dr. Rodriguez',
  },
  {
    id: '13',
    studentId: '6',
    subject: 'PHY101',
    date: '2025-12-26',
    time: '16:00',
    status: 'late',
    lecturer: 'Prof. Lee',
  },

  // George Miller's records
  {
    id: '14',
    studentId: '7',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '08:30',
    status: 'present',
    lecturer: 'Dr. White',
  },
  {
    id: '15',
    studentId: '7',
    subject: 'PHY101',
    date: '2025-12-27',
    time: '12:00',
    status: 'present',
    lecturer: 'Prof. Black',
  },

  // Helen Taylor's records
  {
    id: '16',
    studentId: '8',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '13:00',
    status: 'absent',
    lecturer: 'Dr. Green',
  },
  {
    id: '17',
    studentId: '8',
    subject: 'PHY101',
    date: '2025-12-27',
    time: '15:00',
    status: 'present',
    lecturer: 'Prof. Blue',
  },

  // Ian Anderson's records
  {
    id: '18',
    studentId: '9',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '10:00',
    status: 'present',
    lecturer: 'Dr. Red',
  },
  {
    id: '19',
    studentId: '9',
    subject: 'PHY101',
    date: '2025-12-26',
    time: '11:30',
    status: 'present',
    lecturer: 'Prof. Yellow',
  },

  // Julia Martinez's records
  {
    id: '20',
    studentId: '10',
    subject: 'PHY101',
    date: '2025-12-28',
    time: '14:00',
    status: 'present',
    lecturer: 'Dr. Purple',
  },
  {
    id: '21',
    studentId: '10',
    subject: 'PHY101',
    date: '2025-12-27',
    time: '16:00',
    status: 'late',
    lecturer: 'Prof. Orange',
  },
];

// Helper function to get student stats
export const getStudentStats = (studentId: string): StudentStats => {
  const studentRecords = mockAttendanceRecords.filter(record => record.studentId === studentId);
  const totalClasses = studentRecords.length;
  const presentCount = studentRecords.filter(record => record.status === 'present').length;
  const absentCount = studentRecords.filter(record => record.status === 'absent').length;
  const lateCount = studentRecords.filter(record => record.status === 'late').length;
  const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  return {
    totalClasses,
    presentCount,
    absentCount,
    lateCount,
    attendanceRate,
  };
};

// Helper function to get student by ID
export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find(student => student.id === id);
};

// Helper function to get attendance records for a student
export const getStudentAttendanceRecords = (studentId: string): AttendanceRecord[] => {
  return mockAttendanceRecords.filter(record => record.studentId === studentId);
};

// Sample QR codes for attendance marking
export const mockQRCodes = [
  {
    id: 'qr-001',
    courseId: 'CS101',
    courseName: 'Introduction to Programming',
    lecturerId: 'LEC001',
    lecturerName: 'Dr. Sarah Johnson',
    date: new Date().toISOString().split('T')[0], // Today's date
    time: '09:00',
    location: 'Room 101',
    qrData: 'attendance:CS101:2024-01-15:09:00:LEC001:Room101'
  },
  {
    id: 'qr-002',
    courseId: 'MATH201',
    courseName: 'Advanced Calculus',
    lecturerId: 'LEC002',
    lecturerName: 'Prof. Michael Chen',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    location: 'Room 203',
    qrData: 'attendance:MATH201:2024-01-15:11:00:LEC002:Room203'
  },
  {
    id: 'qr-003',
    courseId: 'PHY101',
    courseName: 'Physics Fundamentals',
    lecturerId: 'LEC003',
    lecturerName: 'Dr. Emily Rodriguez',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    location: 'Lab 5',
    qrData: 'attendance:PHY101:2024-01-15:14:00:LEC003:Lab5'
  }
];

// Helper function to validate QR code data
export const validateQRCode = (qrData: string): boolean => {
  // Expected format: attendance:COURSE_ID:DATE:TIME:LECTURER_ID:LOCATION
  const parts = qrData.split(':');
  return parts.length === 6 && parts[0] === 'attendance';
};

// Helper function to parse QR code data
export const parseQRCode = (qrData: string) => {
  if (!validateQRCode(qrData)) {
    throw new Error('Invalid QR code format');
  }

  const [, courseId, date, time, lecturerId, location] = qrData.split(':');
  return {
    courseId,
    date,
    time,
    lecturerId,
    location,
    qrData
  };
};