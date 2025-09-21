import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, AppleLoginProvider } from '@abacritt/angularx-social-login';

export const socialLoginConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('GOOGLE_CLIENT_ID') // Replace with your Google client ID
    },
    {
      id: AppleLoginProvider.PROVIDER_ID,
      provider: new AppleLoginProvider({ clientId: 'APPLE_CLIENT_ID' }) // Replace with your Apple client ID
    }
  ],
};
