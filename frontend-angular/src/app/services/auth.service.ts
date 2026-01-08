import { Injectable } from '@angular/core';
import keycloak from '../auth/keycloak.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  init(): Promise<boolean> {
    return keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });
  }

  get token(): string | undefined {
    return keycloak.token;
  }

  get username(): string {
    return keycloak.tokenParsed?.['preferred_username'];
  }

  get roles(): string[] {
    return keycloak.tokenParsed?.realm_access?.roles ?? [];
  }

  async refreshToken(): Promise<void> {
    try {
      await keycloak.updateToken(30);
    } catch {
      this.logout();
    }
  }

  logout() {
    keycloak.logout({ redirectUri: window.location.origin });
  }
}
