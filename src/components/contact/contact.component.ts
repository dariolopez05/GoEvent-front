import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ngOnInit(): void {
      AOS.init();
  }
}
