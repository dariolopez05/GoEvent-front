import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public username: string = '';
  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.username = localStorage.getItem('userName') || '';
    this.isLoggedIn = localStorage.getItem('logeado') === 'true';
    AOS.init();
  }
}
