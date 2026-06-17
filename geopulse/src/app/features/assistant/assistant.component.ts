import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <div class="assistant-container">
      <div class="chat-history">
        @for (msg of messages(); track msg.id) {
          <div [class]="'message ' + msg.role">
            {{ msg.text }}
          </div>
        }
      </div>
      <div class="input-area">
        <mat-form-field appearance="outline">
          <input matInput [ngModel]="currentQuery()" (ngModelChange)="currentQuery.set($event)" placeholder="Ask about the territory..." (keyup.enter)="sendQuery()">
          <button mat-icon-button matSuffix (click)="sendQuery()">
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: [`
    .assistant-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px;
    }
    .chat-history {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 16px;
    }
    .message {
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 4px;
    }
    .user { background: #e3f2fd; align-self: flex-end; }
    .ai { background: #f5f5f5; align-self: flex-start; }
    .input-area { width: 100%; }
    mat-form-field { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistantComponent {
  private api = inject(ApiService);

  messages = signal<Array<{id: number, text: string, role: 'user' | 'ai'}>>([]);
  currentQuery = signal('');

  sendQuery() {
    const query = this.currentQuery();
    if (!query) return;

    this.messages.update(msgs => [...msgs, {
      id: Date.now(),
      text: query,
      role: 'user'
    }]);

    this.currentQuery.set('');

    // In a real implementation, we would call the API
    // this.api.post('ai/analyze', { query }).subscribe(...)

    setTimeout(() => {
      this.messages.update(msgs => [...msgs, {
        id: Date.now(),
        text: "I'm analyzing your request via GeoPulse API...",
        role: 'ai'
      }]);
    }, 1000);
  }
}
