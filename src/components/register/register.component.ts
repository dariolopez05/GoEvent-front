import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      city: [''],
      privacy: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Payload enviado:', formData);

      this.loading = true;

  
      this.userService.createUser(formData).subscribe({
        next: (response: any) => {
          console.log('Usuario creado con éxito:', response);
          window.alert('Usuario creado con éxito');
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error al crear el usuario:', error);
          this.loading = false;
        }
      });
    } else {

      window.alert('Por favor, completa todos los campos requeridos y acepta la política de privacidad.');
      this.loading = false; 
  }  
}
}