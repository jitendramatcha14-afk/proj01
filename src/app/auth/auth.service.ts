import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User roles for authentication
export type UserRole = 'admin' | 'teacher' | 'student';

// User model
export interface User {
  id: string;
  username: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Update with your deployed backend URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Login using backend API
  login(username: string, password: string): Observable<User> {
    return new Observable(observer => {
      this.http.post<User>(`${this.apiUrl}/users/login`, { username, password }).subscribe({
        next: user => {
          this.currentUserSubject.next(user);
          observer.next(user);
          observer.complete();
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  }

  // Register using backend API
  register(username: string, password: string, role: UserRole): Observable<User> {
    return new Observable(observer => {
      this.http.post<User>(`${this.apiUrl}/users/register`, { username, password, role }).subscribe({
        next: user => {
          observer.next(user);
          observer.complete();
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  }

  // Log out the current user
  logout(): void {
    this.currentUserSubject.next(null);
  }

  // Get the current user synchronously
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
