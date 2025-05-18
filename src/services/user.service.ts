import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;
  private apiLogin = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.apiUrl}/register`, userData, { headers });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiLogin, body);
  }

  setFavourites(userId: number, favourites: string[]): Observable<any> {
    const url = `${environment.apiUrl}/user/favourites`;
    const body = { userId, eventIds: favourites };

    return this.http.post<any>(url, body);
  }
}