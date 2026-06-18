import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div class="chart-container"><canvas #chartCanvas></canvas></div>',
  styles: ['.chart-container { position: relative; height: 300px; width: 100%; }'],
})
export class GrowthChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [{
          label: 'Croissance (km²)',
          data: [12, 12.5, 13.2, 14.1, 14.8, 15.5, 16.2, 16.8, 17.3, 17.8, 18.2, 18.4],
          borderColor: '#6C5CE7',
          backgroundColor: 'rgba(108, 92, 231, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    };
    new Chart(this.chartCanvas.nativeElement, config);
  }
}
