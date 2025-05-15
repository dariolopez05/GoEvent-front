import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  ngOnInit(): void {
      AOS.init();
  }
}
