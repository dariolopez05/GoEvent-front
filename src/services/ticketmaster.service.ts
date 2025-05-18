import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Ticketmaster } from '../models/ticketmaster.interface';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { retryWhen, delayWhen, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketmasterService {
  public apiKey: string = 'tZ08mVmIlAuo2fAnahB2eYN5ThiLLaQY';

  constructor(public http: HttpClient, private router: Router) { }

  public getResponse(city: string): Observable<Ticketmaster> {
    const url = `https://app.ticketmaster.com/discovery/v2/events?countryCode=ES&apikey=${this.apiKey}&city=${city}`;
    return this.http.get<Ticketmaster>(url);
  }

  public getResponseId(id: string): Observable<Ticketmaster> {
  const url = `https://app.ticketmaster.com/discovery/v2/events?countryCode=ES&apikey=${this.apiKey}&id=${id}`;
  
  return this.http.get<Ticketmaster>(url).pipe(
    retryWhen(errors =>
      errors.pipe(
        scan((retryCount, error) => {
          if (retryCount >= 3 || error.status !== 429) throw error;
          return retryCount + 1;
        }, 0),
        delayWhen(() => timer(1000))
      )
    ),
    catchError(error => {
      console.log('Error en getResponseId:', error);
      if (error.status === 429) {
        window.alert('Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo.');
        this.router.navigate(['/home']);
      }
      return throwError(() => error);
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
