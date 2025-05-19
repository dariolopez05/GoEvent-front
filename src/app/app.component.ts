import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { ChatBotComponent } from '../components/chat-bot/chat-bot.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ChatBotComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GoEvent';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        gtag('config', 'G-ZH4S1XH37H', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
