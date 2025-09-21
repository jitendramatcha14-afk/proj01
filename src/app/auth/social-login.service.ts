import { Injectable } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  AppleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocialLoginService {
  private userSubject = new BehaviorSubject<SocialUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private authService: SocialAuthService) {
    this.authService.authState.subscribe(user => {
      this.userSubject.next(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithApple(): void {
    this.authService.signIn(AppleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
