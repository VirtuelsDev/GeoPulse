import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantAI as Assistant } from '../../../features/assistant-ai/assistant';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, Assistant],
  template: `<app-assistant-ai></app-assistant-ai>`,
  styles: [`:host { display: block; height: 100%; }`]
})
export class AssistantPanel {}
