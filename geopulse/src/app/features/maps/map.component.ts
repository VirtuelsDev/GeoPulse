import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../core/config/config.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container" [class.dark]="config.darkMode()">
      <div id="map"></div>
    </div>
  `,
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
      background: #f0f0f0;
      transition: background 0.3s;
    }
    .map-container.dark {
      background: #212121;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  protected config = inject(ConfigService);

  zoom = signal(13);
  center = signal<[number, number]>([0, 0]);

  ngOnInit() {
    console.log('MapComponent initialized with theme:', this.config.darkMode() ? 'dark' : 'light');
  }
}
