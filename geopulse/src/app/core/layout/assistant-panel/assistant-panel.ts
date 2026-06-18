import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from '../../../features/assistant/assistant.component';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AssistantComponent],
  template: `
    <app-assistant (close)="close.emit()"></app-assistant>
  `,
  styles: [`
    :host {
      display: block;
      width: 400px;
      height: 100%;
    }
  `]
})
export class AssistantPanelComponent {
  close = output<void>();
}
