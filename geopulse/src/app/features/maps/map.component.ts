import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container">
      <div id="map"></div>
    </div>
  `,
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
      background: #f0f0f0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  // Use signal for state
  zoom = signal(13);
  center = signal<[number, number]>([0, 0]);

  ngOnInit() {
    console.log('MapComponent initialized');
  }
}
