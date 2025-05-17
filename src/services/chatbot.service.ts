import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  // constructor(private http: HttpClient) { }

  // sendMessageToChatGPT(message: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.apiKey}`
  //   });

  //   const body = {
  //     model: 'gpt-3.5-turbo',
  //     messages: [
  //       { role: 'system', content: 'Eres un chatbot simpático que responde en españoEres un asistente virtual especializado en conciertos y festivales, proporcionando solo información sobre eventos musicales, artistas, fechas, lugares y horarios, y redirigiendo educadamente cualquier pregunta fuera de este ámbito.' },
  //       { role: 'user', content: message }
  //     ]
  //   };

  //   return this.http.post(this.apiUrl, body, { headers });
  // }

  private apiUrl = `${environment.apiUrl}/api/chat`;

  constructor(private http: HttpClient) { }

  sendMessageToChatGPT(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { message };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
