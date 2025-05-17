import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private apiUrl = 'http://127.0.0.1:8000/api/users';
  private apiUrl = 'http://goevent-back-production.up.railway.app/api/users';

  constructor(private http: HttpClient) {}

  createUser(userData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json'
    });

    return this.http.post(this.apiUrl, userData, { headers });
  }

  //private apiLogin = 'http://localhost:8000/login';
  private apiLogin = 'http://goevent-back-production.up.railway.app/login';

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiLogin, body);
  }

  setFavourites(userId: number, favourites: string[]): Observable<any> {
    //const url = 'http://localhost:8000/user/favourites';
    const url = 'http://goevent-back-production.up.railway.app/user/favourites';
    const body = { userId, eventIds: favourites };
  
    console.log('Datos enviados al backend:', body);
  
    return this.http.post<any>(url, body);
  }
  
}
