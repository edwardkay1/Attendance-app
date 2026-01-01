import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './auth/Login';
import Register from './auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import LecturerDashboard from './pages/lecturer/Dashboard';
import LecturerClasses from './pages/lecturer/LecturerClasses';
import LecturerMarkAttendance from './pages/lecturer/MarkAttendance';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';

// Components
import RequireAuth from './auth/RequireAuth';
import AdminPageWrapper from './components/layout/admin/PageWrapper';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <RequireAuth>
            <StudentDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <RequireAuth>
            <StudentAttendance />
          </RequireAuth>
        }
      />

      {/* Lecturer Routes */}
      <Route
        path="/lecturer/dashboard"
        element={
          <RequireAuth>
            <LecturerDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/lecturer/classes"
        element={
          <RequireAuth>
            <LecturerClasses />
          </RequireAuth>
        }
      />
      <Route
        path="/lecturer/mark-attendance"
        element={
          <RequireAuth>
            <LecturerMarkAttendance />
          </RequireAuth>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <AdminDashboard />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <AdminUsers />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/super"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <SuperAdminDashboard />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />

      {/* Root route - redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Default redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
