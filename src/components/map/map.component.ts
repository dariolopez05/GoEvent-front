import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TicketmasterService } from '../../services/ticketmaster.service';
import AOS from 'aos';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  public topEvents: any[] = [];
  private map!: L.Map;

  constructor(public service: TicketmasterService) {}

  ngOnInit(): void {
    this.initMap();
    this.getResponse();
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.4168, -3.7038], 6); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  public getResponse(): void {
    this.service.getResponseSize(200).subscribe((response) => {
      const events = response._embedded.events;
  
      const faIcon = L.divIcon({
        html: `<i class="fas fa-map-marker-alt fa-2x" style="color: red;"></i>`,
        className: '',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
  
      this.topEvents = events.map((evento: any) => {
        const nombre = evento.name;
        const venue = evento._embedded?.venues[0];
        const lat = parseFloat(venue.location.latitude);
        const lon = parseFloat(venue.location.longitude);
        const url = evento.url;
      
        return { nombre, lat, lon, url, imageUrl: evento.images[0]?.url };
    });
    
    this.topEvents.forEach(event => {
        if (!isNaN(event.lat) && !isNaN(event.lon)) {
            const popupHtml = `
                <div style="text-align: center;">
                    <img src="${event.imageUrl}" alt="Imagen del evento" style="width: 100px; height: 150px; object-fit: cover; margin-bottom: 10px;">
                    <strong>${event.nombre}</strong><br/>
                    <a href="${event.url}" target="_blank"
                        style="display: inline-block; margin-top: 8px; padding: 8px 16px; background-color: #e63946; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s;">
                        Comprar entradas
                    </a>
                </div>
            `;
    
            L.marker([event.lat, event.lon], { icon: faIcon })
                .addTo(this.map)
                .bindPopup(popupHtml);
        }
    });
    
    });
  }
  
}