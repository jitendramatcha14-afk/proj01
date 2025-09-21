import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService, UserRole } from './auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  username = '';
  password = '';
  role: UserRole = 'student';
  error = '';
  success = '';

  constructor(private authService: AuthService) {}

  signup() {
    if (!this.username || !this.password) {
      this.error = 'All fields are required.';
      this.success = '';
      return;
    }
    this.authService.register(this.username, this.password, this.role).subscribe({
      next: user => {
        this.success = 'Account created! You can now log in.';
        this.error = '';
      },
      error: err => {
        this.error = err.error?.error || 'Registration failed';
        this.success = '';
      }
    });
  }
}
