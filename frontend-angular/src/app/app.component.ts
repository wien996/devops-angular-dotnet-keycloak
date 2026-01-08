import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './services/test.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>DevOps Angular + Keycloak</h1>

    <p><strong>User:</strong> {{ auth.username }}</p>
    <p><strong>Roles:</strong> {{ auth.roles.join(', ') }}</p>

    <button (click)="callPublic()">Public</button>
    <button (click)="callAuthenticated()">Authenticated</button>
    <button (click)="callUser()">User</button>
    <button (click)="callAdmin()">Admin</button>

    <pre>{{ result }}</pre>

    <button (click)="auth.logout()">Logout</button>
  `
})
export class AppComponent {
  result = '';

  constructor(
    public auth: AuthService,
    private testService: TestService
  ) {}

  callPublic() {
    this.testService.publicEndpoint()
      .subscribe(r => this.result = r);
  }

  callAuthenticated() {
    this.testService.authenticatedEndpoint()
      .subscribe(r => this.result = r);
  }

  callUser() {
    this.testService.userEndpoint()
      .subscribe(r => this.result = r);
  }

  callAdmin() {
    this.testService.adminEndpoint()
      .subscribe(r => this.result = r);
  }
}
