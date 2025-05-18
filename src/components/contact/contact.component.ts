import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';
import { ContactFormService, ContactFormData } from '../../services/contact-form.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactFormService) {}

  onSubmit(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendContactForm(this.form).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = res.message || 'Mensaje enviado con éxito';
        this.form = { name: '', email: '', phone: '', message: '' }; // reset form
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error enviando el mensaje. Intenta de nuevo.';
        console.error(err);
      },
    });
  }
}