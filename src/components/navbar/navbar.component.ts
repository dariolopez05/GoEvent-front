import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public menuOpen:boolean = false;

  public isLoggedIn: boolean = false;
  public username: string = '';

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('userName') || 'Usuario';
    this.isLoggedIn = localStorage.getItem('logeado') === 'true';
  }

  public closeMenu(): void {
    this.menuOpen = false;
  }
  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
}
