import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assistant } from '../../../features/assistant/assistant';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, Assistant],
  template: `<app-assistant></app-assistant>`,
  styles: [`:host { display: block; height: 100%; }`]
})
export class AssistantPanel {}
