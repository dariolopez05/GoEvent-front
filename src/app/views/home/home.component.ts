import { Component } from '@angular/core';
import { HeroComponent } from '../../../components/hero/hero.component';
import { MainComponent } from '../../../components/main/main.component';
import { AboutComponent } from '../../../components/about/about.component';
import { ContactComponent } from '../../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, MainComponent, AboutComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
