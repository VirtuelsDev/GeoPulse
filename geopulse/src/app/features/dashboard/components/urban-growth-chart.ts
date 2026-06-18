import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { DashboardService } from '../services/dashboard.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-urban-growth-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ],
  template: `
    <div echarts [options]="options" class="chart"></div>
  `,
  styles: [`.chart { height: 320px; width: 100%; }`]
})
export class UrbanGrowthChart {
  private service = inject(DashboardService);

  options: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.service.growthData().months,
      axisLine: { lineStyle: { color: '#636e72' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.05)' } }
    },
    series: [{
      name: 'Croissance (km²)',
      type: 'line',
      smooth: true,
      data: this.service.growthData().values,
      itemStyle: { color: '#6C5CE7' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(108, 92, 231, 0.2)' },
            { offset: 1, color: 'rgba(108, 92, 231, 0)' }
          ]
        }
      },
      lineStyle: { width: 3 }
    }]
  };
}
