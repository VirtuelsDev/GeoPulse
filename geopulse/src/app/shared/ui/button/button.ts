import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button [mat-flat-button]="variant === 'flat'"
            [mat-stroked-button]="variant === 'stroked'"
            [color]="color"
            [disabled]="disabled"
            (click)="clicked.emit(\$event)">
      <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
      <ng-content></ng-content>
    </button>
  `
})
export class UiButton {
  @Input() variant: 'flat' | 'stroked' | 'basic' = 'flat';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() icon?: string;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();
}
