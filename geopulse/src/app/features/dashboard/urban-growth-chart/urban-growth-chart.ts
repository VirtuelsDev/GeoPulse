import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-urban-growth-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './urban-growth-chart.html',
  styleUrls: ['./urban-growth-chart.scss'],
})
export class UrbanGrowthChart implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Expansion (Ha)',
          data: [120, 145, 168, 210, 245, 310, 350, 420, 480, 520],
          borderColor: '#6C5CE7',
          backgroundColor: 'rgba(108, 92, 231, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    };
    new Chart(this.chartCanvas.nativeElement, config);
  }
}
