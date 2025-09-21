import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Notification model
export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Subject to emit notifications
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  // Show a notification
  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.notificationSubject.next({ message, type });
  }
}
