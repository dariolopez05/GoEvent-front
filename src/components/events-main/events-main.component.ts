import { Component, Input, OnInit } from '@angular/core';
import { TicketmasterService } from '../../services/ticketmaster.service';
import AOS from 'aos';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-events-main',
  imports: [FormsModule],
  templateUrl: './events-main.component.html',
  styleUrl: './events-main.component.css'
})
export class EventsMainComponent implements OnInit {
  @Input() eventId: string = '';

  public isLoggedIn = false;
  public topEvents: any[] = [];
  public actualPage = 0;
  public totalPages = 0;
  public availableCities: string[] = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma",
    "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "L'Hospitalet de Llobregat",
    "A Coruña", "Granada", "Vitoria-Gasteiz", "Elche", "Oviedo", "Santa Cruz de Tenerife", "Badalona",
    "Cartagena", "Terrassa", "Jerez de la Frontera", "Sabadell", "Móstoles", "Alcalá de Henares",
    "Pamplona", "Fuenlabrada", "Almería", "Leganés", "San Sebastián", "Santander", "Burgos", "Castellón de la Plana",
    "Albacete", "Getafe", "Salamanca", "Huelva", "Logroño", "Badajoz", "Lleida", "Tarragona", "León",
    "Cádiz", "Marbella", "Jaén", "Ourense", "Algeciras", "Girona", "Lugo", "Cáceres", "Santiago de Compostela"
  ];

  public selectedCity = '';
  public favourites: { [key: string]: boolean } = {};
  public loadingById: { [key: string]: boolean } = {};
  public searchInput = '';
  public searchQuery = '';
  public noResultsMessage: string = '';

  constructor(
    private service: TicketmasterService,
    private userService: UserService
  ) {
    this.isLoggedIn = JSON.parse(localStorage.getItem('logeado') || 'false');
  }

  ngOnInit(): void {
    this.getResponse();
    AOS.init();
  }

  onCityChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCity = select.value;
    this.actualPage = 0;
    this.getResponse();
  }

  onSearchClick(): void {
    this.searchQuery = this.searchInput.trim();
    this.actualPage = 0;
    this.getResponse();
  }

  getResponse(page: number = 0): void {
  this.service
    .getResponsePagination(page, this.selectedCity, this.searchQuery)
    .subscribe((response) => {
      if (response._embedded && response._embedded.events) {
        this.topEvents = response._embedded.events;
      } else {
        this.topEvents = []; 
      }

      this.totalPages = response.page.totalPages;
      this.actualPage = response.page.number;

      this.checkIfEventsAreSaved();

      if (this.topEvents.length === 0) {
        this.noResultsMessage = 'No se encontraron eventos con esos filtros.';
      } else {
        this.noResultsMessage = '';
      }
    });
}


  nextPage(): void {
    if (this.actualPage + 1 < this.totalPages) {
      this.getResponse(this.actualPage + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    if (this.actualPage > 0) {
      this.getResponse(this.actualPage - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.getResponse(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkIfEventsAreSaved(): void {
    const stored = localStorage.getItem('favourites');
    const favourites: string[] = stored ? JSON.parse(stored) : [];

    this.topEvents.forEach((event) => {
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
      favourites = favourites.filter((id) => id !== eventId);
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
        error: (err) => {
          console.error('Error al actualizar favoritos:', err);
          this.loadingById[eventId] = false;
        },
      });
    } else {
      console.error('No se ha encontrado el ID de usuario en el localStorage.');
      this.loadingById[eventId] = false;
    }
  }

  clearFilters(): void {
    this.selectedCity = '';
    this.searchInput = '';
    this.searchQuery = '';
    this.actualPage = 0;
    this.getResponse();
    window.location.reload();
  }

}