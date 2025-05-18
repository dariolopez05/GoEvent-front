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

  constructor(private fb: FormBuilder, private userService: UserService) {
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

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { username, email, password, city } = this.form.value;

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
      },
      error: (error) => {
        this.loading = false;

        if (error.status === 409) {
          this.errorMessage = 'El correo ya está registrado.';
        } else {
          this.errorMessage = 'Error al registrar usuario. Intenta de nuevo.';
        }

        console.error(error);
      }
    });
  }
}