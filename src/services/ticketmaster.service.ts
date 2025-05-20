import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Ticketmaster } from '../models/ticketmaster.interface';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { retryWhen, delayWhen, scan } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TicketmasterService {
  public apiKey: string = 'tZ08mVmIlAuo2fAnahB2eYN5ThiLLaQY';
  private apiTicketMaster = `${environment.apiUrl}/api/ticketmaster`;

  constructor(public http: HttpClient, private router: Router) { }

  public getResponse(city: string): Observable<Ticketmaster> {
    const url = `https://app.ticketmaster.com/discovery/v2/events?countryCode=ES&apikey=${this.apiKey}&city=${city}`;
    return this.http.get<Ticketmaster>(url);
  }

 public getResponseId(id: string): Observable<Ticketmaster> {
    return this.http.get<Ticketmaster>(`${this.apiTicketMaster}?id=${id}`).pipe(
      catchError(error => {
        console.error('Error en getResponseId:', error);

        if (error.status === 429) {
          window.alert('Demasiadas peticiones. Por favor espera unos segundos e inténtalo de nuevo.');
          this.router.navigate(['/home']);
        } else if (error.status === 0) {
          window.alert('Error de conexión con el backend. Intenta recargar la página.');
        } else {
          window.alert('Ha ocurrido un error inesperado.');
        }

        return EMPTY; 
      })
    );
  }



  public getResponsePagination(page: number, city: string, query:string): Observable<Ticketmaster> {
    const url = `https://app.ticketmaster.com/discovery/v2/events?countryCode=ES&apikey=${this.apiKey}&page=${page}&city=${city}&keyword=${query}`;
    return this.http.get<Ticketmaster>(url);
  }

  public getResponseSize(size: number): Observable<Ticketmaster> {
    const url = `https://app.ticketmaster.com/discovery/v2/events?countryCode=ES&apikey=${this.apiKey}&size=${size}`;
    return this.http.get<Ticketmaster>(url);
  }
}
