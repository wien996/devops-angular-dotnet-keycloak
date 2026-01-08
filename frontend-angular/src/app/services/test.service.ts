import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {

  private apiUrl = '/api/test';

  constructor(private http: HttpClient) {}

  publicEndpoint(): Observable<string> {
    return this.http.get(`${this.apiUrl}/public`, { responseType: 'text' });
  }

  authenticatedEndpoint(): Observable<string> {
    return this.http.get(`${this.apiUrl}/authenticated`, { responseType: 'text' });
  }

  userEndpoint(): Observable<string> {
    return this.http.get(`${this.apiUrl}/user`, { responseType: 'text' });
  }

  adminEndpoint(): Observable<string> {
    return this.http.get(`${this.apiUrl}/admin`, { responseType: 'text' });
  }
}
