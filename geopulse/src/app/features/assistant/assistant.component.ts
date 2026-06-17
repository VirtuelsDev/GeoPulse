import { Component, ChangeDetectionStrategy, signal, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  template: `
    <div class="assistant-panel">
      <header class="assistant-header">
        <div class="title-row">
          <h3>Assistant IA</h3>
          <button mat-icon-button (click)="close.emit()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <p class="welcome">Bonjour Pierre ! Comment puis-je vous aider ?</p>
      </header>

      <div class="chat-history">
        @for (msg of messages(); track msg.id) {
          <div [class]="'message-bubble ' + msg.role">
            <div class="avatar" *ngIf="msg.role === 'ai'">
               <mat-icon>hub</mat-icon>
            </div>
            <div class="text-content">
              {{ msg.text }}
            </div>
          </div>
        }
        @if (isGenerating()) {
           <div class="message-bubble ai typing">
             <div class="avatar"><mat-icon>hub</mat-icon></div>
             <mat-spinner diameter="16"></mat-spinner>
           </div>
        }
      </div>

      <div class="actions-area">
        <p>Actions rapides :</p>
        <mat-chip-set>
          @for (action of quickActions; track action) {
            <mat-chip (click)="executeAction(action)">{{ action }}</mat-chip>
          }
        </mat-chip-set>
      </div>

      <div class="input-area">
        <mat-form-field appearance="outline">
          <input matInput [ngModel]="currentQuery()" (ngModelChange)="currentQuery.set($event)"
                 placeholder="Posez votre question..." (keyup.enter)="sendQuery()" [disabled]="isGenerating()">
          <button mat-icon-button matSuffix (click)="sendQuery()" [disabled]="!currentQuery() || isGenerating()">
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: [`
    .assistant-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: white;
    }
    .assistant-header {
      padding: 24px;
      border-bottom: 1px solid #eee;
    }
    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .title-row h3 { margin: 0; color: #6C5CE7; }
    .welcome { margin: 0; color: #666; font-size: 0.9rem; }

    .chat-history {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .message-bubble {
      max-width: 85%;
      display: flex;
      gap: 8px;
    }
    .message-bubble.user {
      align-self: flex-end;
      background: #6C5CE7;
      color: white;
      padding: 10px 16px;
      border-radius: 18px 18px 2px 18px;
    }
    .message-bubble.ai {
      align-self: flex-start;
      background: #f1f3f4;
      color: #333;
      padding: 10px 16px;
      border-radius: 18px 18px 18px 2px;
    }
    .avatar {
      width: 24px;
      height: 24px;
      background: #6C5CE7;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .typing { align-items: center; }

    .actions-area {
      padding: 16px;
      border-top: 1px solid #eee;
    }
    .actions-area p { font-size: 0.8rem; color: #999; margin-bottom: 8px; }

    .input-area {
      padding: 16px;
    }
    mat-form-field { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistantComponent {
  @Output() close = new EventEmitter<void>();

  private api = inject(ApiService);

  messages = signal<Array<{id: number, text: string, role: 'user' | 'ai'}>>([
    { id: 1, text: "Je suis votre assistant GeoPulse-AI. Je peux analyser les données de votre territoire.", role: 'ai' }
  ]);

  currentQuery = signal('');
  isGenerating = signal(false);

  quickActions = [
    'Analyser la croissance urbaine',
    'Identifier les zones à risque',
    'Générer un rapport'
  ];

  executeAction(action: string) {
    this.currentQuery.set(action);
    this.sendQuery();
  }

  sendQuery() {
    const query = this.currentQuery();
    if (!query || this.isGenerating()) return;

    this.messages.update(msgs => [...msgs, {
      id: Date.now(),
      text: query,
      role: 'user'
    }]);

    this.currentQuery.set('');
    this.isGenerating.set(true);

    this.api.post<any>('ai/assistant/chat/', { query })
      .pipe(finalize(() => this.isGenerating.set(false)))
      .subscribe({
        next: (res) => {
          this.messages.update(msgs => [...msgs, {
            id: Date.now(),
            text: res.response,
            role: 'ai'
          }]);
        },
        error: (err) => {
          this.messages.update(msgs => [...msgs, {
            id: Date.now(),
            text: "Désolé, j'ai rencontré une erreur lors de l'analyse.",
            role: 'ai'
          }]);
        }
      });
  }
}
