import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantAI as Assistant } from '../../../features/assistant-ai/assistant/assistant';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, Assistant],
  templateUrl: './assistant-panel.html',
  styleUrls: ['./assistant-panel.scss']
})
export class AssistantPanel {}
