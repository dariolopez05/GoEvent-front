import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      city: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
  if (this.form.invalid) return;

  const { username, email, password, city } = this.form.value;

  if (!this.validatePasswordStrength(password)) {
    this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.';
    return;
  }

  this.loading = true;
  this.successMessage = '';
  this.errorMessage = '';

  const userData = {
    username,
    email,
    password,
    city
  };

  this.userService.createUser(userData).subscribe({
    next: () => {
      this.loading = false;
      this.successMessage = 'Usuario registrado con éxito';
      this.form.reset();
      this.router.navigate(['/login']);
    },
    error: (error) => {
      this.loading = false;
      this.errorMessage = error.error?.error || 'Ha ocurrido un error al registrar el usuario';
    }
  });
}

  private validatePasswordStrength(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

}