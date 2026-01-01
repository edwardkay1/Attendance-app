import { authenticateStudent } from './studentAuth';
import { authenticateLecturer } from './lecturerAuth';
import { authenticateAdmin } from './adminAuth';
import type { Student } from '../types/student';
import type { Lecturer } from '../types/lecturer';
import type { Admin } from '../types/admin';

export type UserType = 'student' | 'lecturer' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  type: UserType;
  data: Student | Lecturer | Admin;
}

export type User = AuthUser; // Alias for backward compatibility

// Helper function to get current user from localStorage
export const getCurrentUser = (): AuthUser | null => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
};

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserType;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  facultyId: string;
  studentId?: string;
  employeeId?: string;
  department?: string;
  course?: string;
  year?: number;
  isApproved?: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

// Authentication service
export class AuthService {
  static login(credentials: LoginCredentials): AuthUser | null {
    const { email, password, userType } = credentials;

    switch (userType) {
      case 'student': {
        const studentCred = authenticateStudent(email, password);
        if (studentCred) {
          return {
            id: studentCred.id,
            email: studentCred.email,
            name: studentCred.student.name,
            type: 'student',
            data: studentCred.student
          };
        }
        break;
      }
      case 'lecturer': {
        const lecturerCred = authenticateLecturer(email, password);
        if (lecturerCred) {
          return {
            id: lecturerCred.id,
            email: lecturerCred.email,
            name: lecturerCred.lecturer.name,
            type: 'lecturer',
            data: lecturerCred.lecturer
          };
        }
        break;
      }
      case 'admin': {
        const adminCred = authenticateAdmin(email, password);
        if (adminCred) {
          return {
            id: adminCred.id,
            email: adminCred.email,
            name: adminCred.admin.name,
            type: 'admin',
            data: adminCred.admin
          };
        }
        break;
      }
    }

    return null;
  }

  static register(credentials: RegisterCredentials): boolean {
    const { name, email, userType, facultyId, studentId, employeeId, department, course, year } = credentials;

    try {
      switch (userType) {
        case 'student': {
          if (!studentId || !course || !year) return false;
          // This would normally save to a database
          // For now, we'll just return true to simulate success
          console.log('Student registration:', { name, email, facultyId, studentId, course, year });
          return true;
        }
        case 'lecturer': {
          if (!employeeId || !department) return false;
          // This would normally save to a database
          console.log('Lecturer registration:', { name, email, facultyId, employeeId, department });
          return true;
        }
        default:
          return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
  }

  static getCurrentUser(): AuthUser | null {
    try {
      const userJson = localStorage.getItem('authUser');
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  static getUserType(): UserType | null {
    return localStorage.getItem('userType') as UserType | null;
  }

  static saveUser(user: AuthUser): void {
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', user.type);
  }
}

// Helper functions for getting user data
export const getCurrentStudent = (): Student | null => {
  const user = AuthService.getCurrentUser();
  return user?.type === 'student' ? user.data as Student : null;
};

export const getCurrentLecturer = (): Lecturer | null => {
  const user = AuthService.getCurrentUser();
  return user?.type === 'lecturer' ? user.data as Lecturer : null;
};

export const getCurrentAdmin = (): Admin | null => {
  const user = AuthService.getCurrentUser();
  return user?.type === 'admin' ? user.data as Admin : null;
};