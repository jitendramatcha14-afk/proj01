import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Attendance entry model
export interface AttendanceEntry {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent';
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  // API endpoint for attendance
  private apiUrl = 'https://api.example.com/attendance'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get attendance for a class and date
  getAttendance(classId: string, date: string): Observable<AttendanceEntry[]> {
    return this.http.get<AttendanceEntry[]>(`${this.apiUrl}?classId=${classId}&date=${date}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new attendance entry
  createEntry(entry: AttendanceEntry): Observable<AttendanceEntry> {
    return this.http.post<AttendanceEntry>(this.apiUrl, entry)
      .pipe(catchError(this.handleError));
  }

  // Edit an existing attendance entry
  editEntry(entry: AttendanceEntry): Observable<AttendanceEntry> {
    return this.http.put<AttendanceEntry>(`${this.apiUrl}/${entry.id}`, entry)
      .pipe(catchError(this.handleError));
  }

  // Get attendance report for a class

  // Send email notification
  sendEmailNotification(to: string, subject: string, text: string): Observable<any> {
    // Update the URL to match your backend
    return this.http.post('http://localhost:8080/notify/email', { to, subject, text })
      .pipe(catchError(this.handleError));
  }
  getReport(classId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/report?classId=${classId}`)
      .pipe(catchError(this.handleError));
  }

  // Handle API errors
  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
