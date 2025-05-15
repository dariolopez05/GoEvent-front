import { Component, OnInit } from '@angular/core';
import { TicketmasterService } from '../../services/ticketmaster.service';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites-content',
  templateUrl: './favourites-content.component.html',
  styleUrl: './favourites-content.component.css',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
})
export class FavouritesContentComponent implements OnInit {
  public showFavourites = true;
  favourites: string[] = [];
  favouriteEvents: any[] = [];
  public favouritesId: { [key: string]: boolean } = {};
  loading = false;
  loadingById: { [eventId: string]: boolean } = {};

  constructor(
    public service: TicketmasterService,
    private userService: UserService
  ) {
    const stored = localStorage.getItem('favourites');
    this.favourites = stored ? JSON.parse(stored) : [];
  }

  ngOnInit(): void {
    this.getResponse();
  }

  getResponse(): void {
    this.favouriteEvents = [];
    const requests = this.favourites.map(id => this.service.getResponseId(id));
    this.showFavourites = true;
    this.loading = true;

    if (this.favourites.length === 0) {
      this.showFavourites = false;
      this.loading = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: responses => {
        this.favouriteEvents = responses.map(res => res._embedded.events[0]);
        this.checkIfEventsAreSaved();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showFavourites = false;
      }
    });
  }

  checkIfEventsAreSaved(): void {
    const stored = localStorage.getItem('favourites');
    const favourites: string[] = stored ? JSON.parse(stored) : [];

    this.favouritesId = {};
    this.favouriteEvents.forEach(event => {
      this.favouritesId[event.id] = favourites.includes(event.id);
    });
  }

  saveEvent(eventId: string): void {
    const stored = localStorage.getItem('favourites');
    let favourites: string[] = stored ? JSON.parse(stored) : [];
    
    this.loadingById[eventId] = true;

    if (!favourites.includes(eventId)) {
      favourites.push(eventId);
      this.favouritesId[eventId] = true;
    } else {
      favourites = favourites.filter(id => id !== eventId);
      this.favouritesId[eventId] = false;
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.setFavourites(+userId, favourites).subscribe({
        next: () => {
          this.favourites = favourites;
          this.getResponse();
          this.loadingById[eventId] = false;
        },
        error: () => {
          this.loadingById[eventId] = false;
        }
      });
    } else {
      this.loadingById[eventId] = false;
    }
  }

  trackByEventId(index: number, event: any): string {
    return event.id;
  }
}