import { Component, Input } from '@angular/core';
import { TicketmasterService } from '../../services/ticketmaster.service';
import { UserService } from '../../services/user.service';
import AOS from 'aos';

@Component({
  selector: 'app-main',
  imports: [],
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  public constructor(public service: TicketmasterService, private userService: UserService) {}

  public topEvents: any[] = []; 
  public city: string = '';
  public isLoggedIn: boolean = false;
  @Input() eventId: string = '';
  public favourites: { [key: string]: boolean } = {};
  public loadingById: { [eventId: string]: boolean } = {};


  public getResponse(): void {
    this.service.getResponse(this.city).subscribe((response) => {
      const events = response._embedded.events;

      for (let i = 0; i < Math.min(6, events.length); i++) {
        this.topEvents.push(events[i]);
      }

      console.log(this.topEvents);
      this.checkIfEventsAreSaved();
    });
  }

  ngOnInit(): void {
    this.city = localStorage.getItem('city') || '';
    this.isLoggedIn = localStorage.getItem('logeado') === 'true';
    this.getResponse();
    AOS.init();
    console.log(this.city);
  }

  checkIfEventsAreSaved(): void {
    const stored = localStorage.getItem('favourites');
    const favourites: string[] = stored ? JSON.parse(stored) : [];

    this.topEvents.forEach(event => {
      this.favourites[event.id] = favourites.includes(event.id);
    });
  }

  saveEvent(eventId: string): void {
    this.loadingById[eventId] = true;
  
    const stored = localStorage.getItem('favourites');
    let favourites: string[] = stored ? JSON.parse(stored) : [];
  
    if (!favourites.includes(eventId)) {
      favourites.push(eventId);
      this.favourites[eventId] = true;
      console.log(`Evento ${eventId} guardado en favoritos.`);
    } else {
      favourites = favourites.filter(id => id !== eventId);
      this.favourites[eventId] = false;
      console.log(`Evento ${eventId} eliminado de favoritos.`);
    }
  
    localStorage.setItem('favourites', JSON.stringify(favourites));
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.setFavourites(+userId, favourites).subscribe({
        next: () => {
          console.log('Favoritos actualizados en la base de datos.');
          this.loadingById[eventId] = false;
        },
        error: err => {
          console.error('Error al actualizar favoritos:', err);
          this.loadingById[eventId] = false;
        }
      });
    } else {
      console.error('No se ha encontrado el ID de usuario en el localStorage.');
      this.loadingById[eventId] = false;
    }
  }
}