import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SocialLoginService } from './social-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private socialLoginService: SocialLoginService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: user => {
        this.error = '';
        // Redirect based on role (to be implemented)
      },
      error: err => {
        this.error = err.error?.error || 'Login failed';
      }
    });
  }
  // Social login methods
  loginWithGoogle() {
    this.socialLoginService.signInWithGoogle();
    this.socialLoginService.user$.subscribe(user => {
      if (user) {
        // You can map Google user to your app user model here
        this.authService.login(user.email, ''); // Or handle differently
        this.error = '';
      }
    });
  }
  // Apple login not supported by this library
  loginWithApple() {
    alert('Apple login is not supported by this library.');
  }
}
