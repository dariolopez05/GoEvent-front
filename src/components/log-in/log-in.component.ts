import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = 'Por favor completa todos los campos.';  
      return;
    }
  
    this.loading = true;
  
    const { email, password } = this.form.value;
  
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.errorMessage = '';
        localStorage.setItem('userId', res.user.id);  
        localStorage.setItem('logeado', 'true'); 
        localStorage.setItem('city', res.user.city);
        localStorage.setItem('userName', res.user.username);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('favourites', JSON.stringify(res.user.favourites));
  
        window.alert('Login éxitoso');
  
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Error en el inicio de sesión.';
      }
    });
  }  
}
