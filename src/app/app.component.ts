import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { ChatBotComponent } from '../components/chat-bot/chat-bot.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ChatBotComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-finder';
}
