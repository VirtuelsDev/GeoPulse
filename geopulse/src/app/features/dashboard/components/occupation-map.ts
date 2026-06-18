import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-occupation-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="map-wrapper">
      <div #mapContainer class="map-container"></div>
      <div class="map-legend glass">
        <h4>Occupation du sol</h4>
        <div class="legend-item"><span class="dot habitat"></span> Habitat</div>
        <div class="legend-item"><span class="dot commercial"></span> Commercial</div>
        <div class="legend-item"><span class="dot green"></span> Espaces verts</div>
      </div>
    </div>
  `,
  styles: [`
    .map-wrapper { position: relative; height: 100%; border-radius: 12px; overflow: hidden; }
    .map-container { height: 100%; width: 100%; }
    .map-legend {
      position: absolute; bottom: 20px; right: 20px; z-index: 1000;
      padding: 12px 16px; border-radius: 12px; min-width: 150px;
      h4 { margin: 0 0 8px; font-size: 0.8125rem; font-weight: 700; }
    }
    .legend-item {
      display: flex; align-items: center; gap: 8px; font-size: 0.75rem; margin-bottom: 4px;
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .habitat { background: #E17055; }
      .commercial { background: #6C5CE7; }
      .green { background: #00B894; }
    }
  `]
})
export class OccupationMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map?: L.Map;

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  private initMap() {
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false
    }).setView([48.8566, 2.3522], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.control.zoom({ position: 'topleft' }).addTo(this.map);
  }
}
