import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // private apiUrl = 'http://localhost:8080/weatherforecast';

  // constructor(private http: HttpClient) {}

  // getWeather(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  private apiUrl = `${environment.apiUrl}/weatherforecast`;

  constructor(private http: HttpClient) { }

  getWeather(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
