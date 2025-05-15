import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import AOS from 'aos';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements AfterViewChecked {
  public isOpen: boolean = false;
  public isAnimating: boolean = false;
  public userInput: string = '';
  public messages: { role: 'user' | 'bot', content: string }[] = [];
  public userName: string = '';

  @ViewChild('chatBody') chatBody: ElementRef | undefined;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    AOS.init();
    this.userName = localStorage.getItem('userName') || '';
    this.messages.push({ role: 'bot', content: `Hola ${this.userName}, ¿en qué puedo ayudarte hoy?` });
  }

  toggleChat() {
    if (this.isOpen) {
      // Animar salida antes de cerrar
      this.isAnimating = true;
      setTimeout(() => {
        this.isOpen = false;
        this.isAnimating = false;
      }, 300); // Duración de la animación de salida (0.3s)
    } else {
      this.isOpen = true;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage() {
  if (!this.userInput.trim()) return;

  const userMsg = this.userInput;
  this.messages.push({ role: 'user', content: userMsg });
  this.userInput = '';

  const loadingMessage = { role: 'bot' as const, content: '__loading__' };
  this.messages.push(loadingMessage);

  this.chatbotService.sendMessageToChatGPT(userMsg).subscribe({
    next: (res) => {
      const index = this.messages.findIndex(msg => msg.role === 'bot' && msg.content === '__loading__');
      if (index > -1) this.messages.splice(index, 1);

      if (res && res.reply) {
        this.messages.push({ role: 'bot', content: res.reply });
      } else {
        this.messages.push({ role: 'bot', content: 'No pude entender la respuesta del servidor. Intenta de nuevo más tarde.' });
      }
    },
    error: (err) => {
      console.error('Error al contactar con la API:', err);

      const index = this.messages.findIndex(msg => msg.role === 'bot' && msg.content === '__loading__');
      if (index > -1) this.messages.splice(index, 1);

      this.messages.push({ role: 'bot', content: 'Ups, algo fue mal al contactar con el servidor 🤖' });
    }
  });
}

  scrollToBottom(): void {
    if (this.chatBody) {
      const chatElement = this.chatBody.nativeElement;
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }
}
