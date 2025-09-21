import { NotificationComponent } from '../shared/notification.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AttendanceService, AttendanceEntry } from '../services/attendance.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  imports: [CommonModule, FormsModule, NotificationComponent]
})
export class AttendanceComponent {
  status: 'present' | 'absent' | '' = '';
  studentId = '';
  classId = '';
  date = '';

  constructor(
    private attendanceService: AttendanceService,
    private notificationService: NotificationService
  ) {}

  markAttendance() {
    if (!this.studentId || !this.classId || !this.date || !this.status) {
      this.notificationService.show('Please fill all fields', 'error');
      return;
    }
    const entry: AttendanceEntry = {
      id: '',
      studentId: this.studentId,
      classId: this.classId,
      date: this.date,
      status: this.status
    };
    this.attendanceService.createEntry(entry).subscribe({
      next: () => {
        if (this.status === 'present') {
          this.notificationService.show('You are marked present!', 'success');
        } else {
          this.notificationService.show('You are marked absent!', 'info');
        }
      },
      error: () => {
        this.notificationService.show('Failed to mark attendance', 'error');
      }
    });
  }
}
