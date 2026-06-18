import { Injectable, signal, inject } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { finalize } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private api = inject(ApiService);

  messages = signal<ChatMessage[]>([
    { role: 'ai', text: 'Bonjour Pierre ! Je suis GeoPulse-AI, votre assistant d\'intelligence territoriale. Comment puis-je vous aider aujourd\'hui ?', timestamp: new Date() }
  ]);

  isGenerating = signal(false);

  sendMessage(query: string) {
    if (!query || this.isGenerating()) return;

    const userMsg: ChatMessage = { role: 'user', text: query, timestamp: new Date() };
    this.messages.update(m => [...m, userMsg]);

    this.isGenerating.set(true);

    this.api.post<{response: string}>('ai/assistant/chat/', { query })
      .pipe(finalize(() => this.isGenerating.set(false)))
      .subscribe({
        next: (res: {response: string}) => {
          const aiMsg: ChatMessage = { role: 'ai', text: res.response, timestamp: new Date() };
          this.messages.update(m => [...m, aiMsg]);
        },
        error: (err: unknown) => {
          const errorMsg: ChatMessage = {
            role: 'ai',
            text: 'Désolé, je rencontre des difficultés pour accéder aux services d\'analyse. Veuillez réessayer ultérieurement.',
            timestamp: new Date()
          };
          this.messages.update(m => [...m, errorMsg]);
        }
      });
  }
}
