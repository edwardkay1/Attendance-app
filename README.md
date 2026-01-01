# Uganda Martyrs University - Attendance Management System

A comprehensive web-based attendance tracking system built with React, TypeScript, and Tailwind CSS for Uganda Martyrs University. The system supports role-based access for students, lecturers, and administrators with QR code-based attendance marking.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication**: Student, Lecturer, Faculty Admin, and Super Admin roles
- **QR Code Attendance**: Generate and scan QR codes for real-time attendance marking
- **Approval Workflows**: Admin approval required for new user registrations
- **Responsive Design**: Mobile-first design with glass-morphism UI
- **Report Generation**: PDF/CSV export for attendance reports
- **Real-time Dashboard**: Statistics and analytics for all user roles

### User Roles & Permissions

#### 👨‍🎓 Students
- Register with faculty ID, student ID, course, and year
- Scan QR codes during class sessions
- View personal attendance history and statistics
- Mobile-responsive dashboard

#### 👨‍🏫 Lecturers
- Generate QR codes for class sessions
- Monitor attendance for assigned courses
- View course-wise attendance reports
- Manage class schedules

#### 👨‍💼 Faculty Admins
- Approve student and lecturer registrations
- Manage courses and users within faculty
- Generate faculty-wide reports
- Oversee department operations

#### 👑 Super Admins
- System-wide user management
- Multi-faculty oversight
- Comprehensive analytics and reporting
- System configuration and maintenance

## 🛠️ Technology Stack

### Frontend
- **React 19.2.0** - Modern React with concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **React Router 6.30.2** - Client-side routing
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Vite 7.2.4** - Fast build tool with HMR
- **QR Scanner 1.4.2** - Camera-based QR code scanning
- **QRCode 1.5.4** - QR code generation
- **jsPDF 3.0.4** - PDF report generation
- **Lucide React 0.562.0** - Modern icon library
- **React Hot Toast 2.6.0** - Toast notifications

### Development Tools
- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint 8.46.4** - TypeScript linting
- **Vite Plugin React 5.1.1** - React integration
- **Autoprefixer 10.4.23** - CSS vendor prefixing
- **PostCSS 8.5.6** - CSS processing

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── cards/           # Dashboard stat cards
│   │   │   ├── AttendanceStat.tsx
│   │   │   └── CourseCard.tsx
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.tsx   # Mobile hamburger menu
│   │   │   ├── PageWrapper.tsx # Main layout wrapper
│   │   │   └── Sidebar.tsx  # Navigation sidebar
│   │   └── tables/          # Data display tables
│   │       └── AttendanceTable.tsx
│   ├── pages/               # Route-based page components
│   │   ├── admin/
│   │   │   ├── Courses.tsx  # Course management
│   │   │   ├── Dashboard.tsx # Admin dashboard
│   │   │   └── Users.tsx    # User management
│   │   ├── lecturer/
│   │   │   ├── Dashboard.tsx # Lecturer dashboard
│   │   │   └── MarkAttendance.tsx # QR generation
│   │   └── student/
│   │       ├── Attendance.tsx # Attendance history
│   │       └── Dashboard.tsx # Student dashboard
│   ├── auth/                # Authentication components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── RequireAuth.tsx  # Route protection
│   ├── data/                # Mock data (development only)
│   │   ├── mockAdminData.ts
│   │   ├── mockLecturerData.ts
│   │   └── mockStudentData.ts
│   ├── types/               # TypeScript definitions
│   │   ├── admin.ts         # Admin & faculty types
│   │   ├── lecturer.ts      # Lecturer & course types
│   │   └── student.ts       # Student & attendance types
│   ├── utils/               # Utility functions
│   │   └── attendance.ts    # Report generation
│   └── assets/              # Static assets
├── public/                  # Public static files
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## 🏗️ Architecture Overview

### Component Architecture
- **Layout System**: PageWrapper provides consistent layout with responsive sidebar
- **Authentication Flow**: Role-based routing with RequireAuth protection
- **Modal System**: Reusable modals for user interactions
- **Data Flow**: Mock data layer with clear separation of concerns

### State Management
- **Local State**: React hooks for component-level state
- **Session Management**: localStorage-based authentication
- **Mock Data**: JSON-based data simulation for development

### Type System
- **Strict TypeScript**: Full type coverage with interfaces
- **Role-based Types**: Separate type definitions per user role
- **API Contract Types**: Clear data structure definitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/edwardkay1/UMU-Attendace-App>
   cd attendance-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5177`

## 📖 Usage Guide

### Student Workflow
1. Register with faculty ID, student ID, course, and year
2. Wait for faculty admin approval
3. Login and access dashboard
4. Use mobile camera to scan QR codes during class
5. View attendance history and statistics

### Lecturer Workflow
1. Register with faculty ID, employee ID, and department
2. Wait for faculty admin approval
3. Login and navigate to "Mark Attendance"
4. Generate QR codes for class sessions
5. Monitor real-time attendance data

### Admin Workflow
1. Login with admin credentials
2. Review and approve pending registrations
3. Manage courses and user permissions
4. Generate comprehensive reports

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Quality
- **TypeScript Strict Mode**: Full type checking enabled
- **ESLint Configuration**: React and TypeScript rules
- **Prettier Integration**: Consistent code formatting
- **Import Organization**: Clean import statements

### Mobile Responsiveness
- **Breakpoint System**: Tailwind responsive utilities
- **Touch Interactions**: Mobile-optimized button sizes
- **Sidebar Management**: Auto-close on mobile navigation
- **Camera Access**: QR scanner optimized for mobile devices

## 🔌 Backend Requirements

The frontend is fully implemented and ready for backend integration. The backend folder is currently empty and requires implementation of the following:

### Core API Endpoints

#### Authentication (`/api/auth`)
- `POST /login` - User authentication
- `POST /register` - User registration
- `POST /logout` - Session termination
- `GET /me` - Get current user info

#### Users (`/api/users`)
- `GET /` - List users (admin only)
- `GET /:id` - Get user details
- `PUT /:id/approve` - Approve user registration
- `DELETE /:id` - Delete user (admin only)

#### Courses (`/api/courses`)
- `GET /` - List courses
- `POST /` - Create course (admin/lecturer)
- `GET /:id` - Get course details
- `PUT /:id` - Update course
- `DELETE /:id` - Delete course

#### Attendance (`/api/attendance`)
- `POST /mark` - Mark attendance via QR scan
- `GET /student/:id` - Get student attendance history
- `GET /course/:id` - Get course attendance records
- `GET /reports` - Generate attendance reports

#### QR Sessions (`/api/qr-sessions`)
- `POST /generate` - Generate QR code for class
- `GET /active` - Get active QR sessions
- `PUT /:id/deactivate` - Deactivate QR session

### Data Models

#### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer' | 'faculty_admin' | 'super_admin';
  facultyId?: string;
  isApproved: boolean;
  createdAt: Date;
  // Role-specific fields...
}
```

#### Database Schema Requirements
- Users table with role-based fields
- Courses table with scheduling
- Attendance records table
- QR sessions table with expiration
- Faculty/Department tables

### Real-time Features
- **WebSocket Support**: Real-time attendance updates
- **Push Notifications**: Approval status updates
- **Live Dashboard**: Real-time statistics

### Security Requirements
- **JWT Authentication**: Token-based auth
- **Role-based Access Control**: Permission validation
- **Input Validation**: Sanitize all inputs
- **Rate Limiting**: API rate protection
- **CORS Configuration**: Frontend domain whitelist

### File Storage
- **Profile Images**: User avatar storage
- **Report Exports**: PDF/CSV generation
- **QR Code Images**: Temporary QR storage

### Email Integration
- **Approval Notifications**: User registration approvals
- **Report Delivery**: Scheduled report emails
- **Password Reset**: Recovery workflow

### Recommended Tech Stack
- **Node.js/Express** or **Python/FastAPI**
- **PostgreSQL** or **MongoDB**
- **Redis** for session/cache
- **Socket.io** for real-time features
- **AWS S3** or **Azure Blob** for file storage
- **SendGrid/Mailgun** for email

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- Real database integration
- Email notifications
- Advanced analytics
- Mobile app companion
- LMS integrations
- Automated scheduling
- Multi-tenant architecture

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for Uganda Martyrs University**
```
