import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.scss']
})
export class Map implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map?: L.Map;

  ngAfterViewInit() {
    this.map = L.map(this.mapContainer.nativeElement).setView([12.37, -1.52], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
