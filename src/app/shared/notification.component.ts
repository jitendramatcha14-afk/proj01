import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(n => {
      this.notification = n;
      setTimeout(() => this.notification = null, 3000);
    });
  }
}
