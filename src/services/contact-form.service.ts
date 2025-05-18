import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
 private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
