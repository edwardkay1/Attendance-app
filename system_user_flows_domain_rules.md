# University Attendance System — User Flows & Domain Rules

## 1. Purpose of This Document
This document defines the **current agreed-upon user flows, domain structure, and operational rules** for the University Attendance System backend.

It is intended to:
- Serve as a **source of truth** during backend implementation
- Align frontend, backend, and future contributors
- Demonstrate **professional system design** for production readiness

---

## 2. Core Domain Structure

### 2.1 Long‑Lived (Stable) Entities
These entities persist across years and semesters.

- **School**
  - Example: School of Engineering

- **Program**
  - Example: BSc Software Engineering
  - Belongs to a School

- **CourseUnit**
  - Example: Engineering Mathematics
  - Represents the canonical course definition

---

### 2.2 Time‑Bound (Academic) Entities
These entities define academic structure per year and semester.

- **AcademicYear**
  - Example: 2026 / 2027

- **Semester**
  - Example: Semester 1, Semester 2
  - Belongs to an AcademicYear

- **CourseOffering**
  - A CourseUnit offered in a specific Semester and AcademicYear
  - Example: Engineering Mathematics — Semester 1 (2026/2027)
  - Belongs to a Program
  - This is the **primary operational unit** for enrollment, teaching, and attendance

---

## 3. User Roles & Responsibilities

### 3.1 SchoolAdmin
Scope: School‑wide

Responsibilities:
- Create and manage Schools
- Create AcademicYears
- AcademicYears automatically generate Semester 1 & Semester 2
- Create Programs
- Assign ProgramAdmins
- High‑level overrides and governance

---

### 3.2 ProgramAdmin (Program Lead)
Scope: Program + Semester

Responsibilities:
- Create CourseUnits (if not already existing)
- Create CourseOfferings for a specific Semester
- Assign Lecturers to CourseOfferings
- Import Student Registry via CSV
- Enroll students into CourseOfferings

---

### 3.3 Lecturer
Scope: Assigned CourseOfferings

Responsibilities:
- Create Sessions (class meetings)
- Open and close attendance windows
- Generate QR codes / one‑time codes
- View real‑time attendance
- Override or validate flagged attendance records

---

### 3.4 Student
Scope: Self

Responsibilities:
- Claim account using student number
- Authenticate and access dashboard
- Check in to sessions
- View attendance history and performance

---

## 4. Student Identity & Enrollment Model

### 4.1 Student Registry (Anti‑Impersonation)

- Students **do not freely self‑register**
- ProgramAdmins import a **Student Registry CSV** containing:
  - student_number
  - full_name
  - email
  - program

This registry acts as the authoritative source of student identity.

---

### 4.2 Student Account Claim Flow

1. Student enters student_number
2. System verifies existence in Student Registry
3. Magic link is sent to registered email
4. Student sets password and activates account
5. Student gains access to enrolled CourseOfferings

---

### 4.3 Enrollment

- Enrollment links a Student to a CourseOffering
- Enrollment is created by ProgramAdmin (CSV or UI)
- Students can only check in to sessions for CourseOfferings they are enrolled in

---

## 5. Attendance & Session Model

### 5.1 Session

- A Session represents a **single lecture occurrence**
- Created by Lecturer under a CourseOffering
- Contains:
  - start_time
  - end_time
  - location metadata
  - attendance window status

---

### 5.2 Attendance Check‑In Flow

1. Lecturer opens attendance for a Session
2. System generates:
   - Rotating QR token (short‑lived)
   - 6‑character fallback code
3. Student (logged in) scans QR or enters code
4. Backend validates:
   - Student is enrolled
   - Session is open
   - Token is valid
   - Student has not already checked in
5. AttendanceRecord is created
6. AttendanceEvent is logged

---

## 6. Fraud Prevention & Geo‑Location Rules

### 6.1 Geo‑Location Policy

- Geo‑location is **not a hard requirement**
- Geo data is treated as a **fraud signal**
- Possible states:
  - IN_RANGE
  - OUT_OF_RANGE
  - LOCATION_MISSING

---

### 6.2 Attendance Confidence

- Attendance records may carry flags
- Flags are visible to lecturers
- Geo anomalies do **not block** check‑in by default
- Lecturer can validate or override flagged records

All overrides are logged.

---

## 7. Automation & Real‑Time Behavior

### 7.1 Real‑Time Updates

- Instructor dashboards receive live attendance updates
- Implemented via WebSockets
- Events include:
  - student_checked_in
  - attendance_flagged
  - session_closed

---

### 7.2 Automated Tasks (Async)

Automated processes include:
- Auto‑close attendance windows
- Mark absent students
- Generate session summaries
- Flag anomalies
- Notify lecturers or students (optional)

---

## 8. Auditability & Traceability

### 8.1 Attendance Events

Every significant action creates an immutable AttendanceEvent:
- check‑in attempted
- check‑in accepted
- check‑in flagged
- override applied
- session opened / closed

This ensures:
- Transparency
- Debuggability
- Dispute resolution

---

## 9. Design Principles

- Separation of **identity**, **enrollment**, and **attendance**
- Clear role‑based permissions
- Event‑driven audit trail
- Real‑time where it adds real value
- Automation for correctness, not novelty

---

## 10. Status

This document reflects the **current approved design direction**.
It is expected to evolve as implementation progresses, but any changes should be deliberate and documented.


>--- **created on 2024-06-15.**
