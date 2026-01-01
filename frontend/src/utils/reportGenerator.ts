import { getSystemStats, getRecentActivity, getCourseStats } from '../data/mockAdminData';
import { mockStudents } from '../data/mockStudentData';
import { mockLecturers, mockCourses } from '../data/mockLecturerData';

/**
 * Formats data for UMU official documentation standards.
 * Includes University Branding Header and structured sections.
 */
const getUMUHeader = (title: string) => `
--------------------------------------------------------------------------------
         UGANDA MARTYRS UNIVERSITY - ACADEMIC REGISTRY SYSTEM
                     OFFICIAL ${title.toUpperCase()}
--------------------------------------------------------------------------------
Generated: ${new Date().toLocaleDateString('en-GB')} | ${new Date().toLocaleTimeString()}
Reference: UMU-AS-REV-${Math.floor(Math.random() * 10000)}
--------------------------------------------------------------------------------
`;

export const generateAttendanceReport = (_facultyId?: string, _courseId?: string, _dateRange?: { start: string; end: string }) => {
  const systemStats = getSystemStats();
  const courseStats = getCourseStats();
  const recentActivity = getRecentActivity(20);

  let content = getUMUHeader('Attendance Analytics Report');

  content += `\n[SYSTEM VITALS]\n`;
  content += `Overall System Health: ${systemStats.systemHealth.toUpperCase()}\n`;
  content += `Total Database Records: ${systemStats.totalAttendanceRecords}\n`;
  content += `Active QR Sessions: ${systemStats.activeQRSessions}\n`;

  content += `\n[COURSE PERFORMANCE MATRICS]\n`;
  content += `%-Rate | Course Code | Course Name\n`;
  content += `-------|-------------|------------------------------------------\n`;
  
  courseStats.forEach(course => {
    const rate = course.averageAttendance.toString().padStart(3, ' ');
    content += `${rate}%  | ${course.courseId.padEnd(11)} | ${course.courseName}\n`;
  });

  content += `\n[AUDIT LOG - LATEST 20]\n`;
  recentActivity.forEach(activity => {
    const date = new Date(activity.timestamp).toLocaleDateString();
    content += `[${date}] ${activity.userType.padEnd(8)} | ${activity.action.padEnd(15)} | ${activity.details}\n`;
  });

  return content + `\n------------------- END OF OFFICIAL DOCUMENT -------------------\n`;
};

/**
 * Generates a Student Census report
 * Note: Profile data is public for viewing but requires owner status for edits.
 */
export const generateStudentsReport = (facultyId?: string) => {
  let content = getUMUHeader('Student Enrollment Census');
  
  const filtered = facultyId 
    ? mockStudents.filter((s: any) => s.facultyId === facultyId) 
    : mockStudents;

  content += `Total Verified Students: ${filtered.length}\n\n`;
  content += `ID          | Name                 | Status     | Faculty\n`;
  content += `------------|----------------------|------------|---------\n`;

  filtered.forEach((s: any) => {
    const status = s.isApproved ? 'VERIFIED' : 'PENDING';
    content += `${s.studentId.padEnd(11)} | ${s.name.padEnd(20)} | ${status.padEnd(10)} | ${s.facultyId}\n`;
  });

  return content + `\n------------------- END OF OFFICIAL DOCUMENT -------------------\n`;
};

/**
 * Generates a Lecturers report
 */
export const generateLecturersReport = (facultyId?: string) => {
  let content = getUMUHeader('Lecturer Directory');
  
  const filtered = facultyId 
    ? mockLecturers.filter((l: any) => l.facultyId === facultyId) 
    : mockLecturers;

  content += `Total Lecturers: ${filtered.length}\n\n`;
  
  filtered.forEach((lecturer: any, index: number) => {
    content += `${index + 1}. ${lecturer.name}\n`;
    content += `   Email: ${lecturer.email}\n`;
    content += `   Department: ${lecturer.department}\n`;
    content += `   Employee ID: ${lecturer.employeeId}\n`;
    content += `   Faculty: ${lecturer.facultyId}\n`;
    content += `   Status: ${lecturer.isApproved ? 'Approved' : 'Pending'}\n\n`;
  });

  return content;
};

/**
 * Generates a Courses report
 */
export const generateCoursesReport = (facultyId?: string) => {
  let content = getUMUHeader('Course Catalog');
  
  const filtered = facultyId 
    ? mockCourses.filter((c: any) => c.facultyId === facultyId) 
    : mockCourses;

  content += `Total Courses: ${filtered.length}\n\n`;
  
  filtered.forEach((course: any, index: number) => {
    content += `${index + 1}. ${course.name} (${course.code})\n`;
    content += `   Department: ${course.department}\n`;
    content += `   Faculty: ${course.facultyId}\n`;
    content += `   Lecturer: ${course.lecturerId}\n`;
    content += `   Status: ${course.isApproved ? 'Approved' : 'Pending'}\n\n`;
  });

  return content;
};

/**
 * Downloads the report with specific MIME types for better compatibility.
 */
export const downloadReport = (content: string, filename: string, format: 'txt' | 'csv' | 'pdf' = 'txt') => {
  let mimeType = 'text/plain';
  let finalContent = content;

  if (format === 'csv') {
    mimeType = 'text/csv';
    // Logic to convert the structured string into actual CSV rows if needed
  }

  const blob = new Blob([finalContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `UMU_Report_${filename.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format}`;
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};