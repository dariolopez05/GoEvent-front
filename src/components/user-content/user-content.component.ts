import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-content',
  imports: [FormsModule],
  templateUrl: './user-content.component.html',
  styleUrl: './user-content.component.css'
})
export class UserContentComponent {
  userId: number = 0;
  userName: string = '';
  city: string = '';
  email: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.userName = localStorage.getItem('userName') || '';
    this.city = localStorage.getItem('city') || '';
    this.email = localStorage.getItem('email') || '';
  }

  updateUser(): void {
    const updatedUser = {
      id: this.userId,
      username: this.userName,
      city: this.city,
      email: this.email,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (res) => {
        this.successMessage = 'Datos actualizados correctamente';

        localStorage.setItem('userName', this.userName);
        localStorage.setItem('city', this.city);
        localStorage.setItem('email', this.email);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al actualizar datos';
      },
    });
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('logeado', 'false');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}