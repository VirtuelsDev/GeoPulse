import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInput),
      multi: true
    }
  ],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input matInput
             [placeholder]="placeholder"
             [(ngModel)]="value"
             (ngModelChange)="onChange(\$event)"
             (blur)="onTouched()"
             [disabled]="disabled">
    </mat-form-field>
  `,
  styles: [`.full-width { width: 100%; }`]
})
export class UiInput implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string = '';

  value: string = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
