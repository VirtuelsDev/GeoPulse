import { Component, ChangeDetectionStrategy, signal, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { AssistantService } from '../../features/assistant-ai/services/assistant.service';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './assistant-panel.html',
  styleUrls: ['./assistant-panel.scss']
})
export class AssistantPanel {
  @Output() close = new EventEmitter<void>();

  service = inject(AssistantService);
  query = signal('');

  quickActions = [
    'Analyser la croissance urbaine',
    'Simuler un projet d\'aménagement',
    'Identifier les zones à risque',
    'Générer un rapport'
  ];

  send() {
    const q = this.query().trim();
    if (q) {
      this.service.sendMessage(q);
      this.query.set('');
    }
  }

  executeAction(action: string) {
    this.service.sendMessage(action);
  }
}
