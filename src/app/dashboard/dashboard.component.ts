import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  private apiUrl = 'http://localhost:8080'; // Update with your deployed backend URL
  attendanceRate = 92; // Example data
  absentees = [
    { name: 'John Doe', class: 'Math', date: '2025-09-20' },
    { name: 'Jane Smith', class: 'Science', date: '2025-09-20' }
  ];
  approvals = [
    { name: 'Mark Lee', class: 'History', date: '2025-09-20' }
  ];
  classes = [
    { name: 'Math', students: 30, present: 28 },
    { name: 'Science', students: 25, present: 24 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  downloadCSV() {
    const classId = 'Math'; // Replace with dynamic value as needed
    this.http.get(`${this.apiUrl}/attendance/export?classId=${classId}`, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadPDF() {
    const classId = 'Math'; // Replace with dynamic value as needed
    this.http.get(`${this.apiUrl}/attendance/export/pdf?classId=${classId}`, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
