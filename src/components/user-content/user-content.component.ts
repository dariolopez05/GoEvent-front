import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-content',
  imports: [],
  templateUrl: './user-content.component.html',
  styleUrl: './user-content.component.css'
})
export class UserContentComponent {
  userName: string = '';
  city: string = '';
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';
    this.city = localStorage.getItem('city') || '';
    this.email = localStorage.getItem('email') || '';
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('logeado', 'false');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
