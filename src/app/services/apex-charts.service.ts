import { Injectable } from '@angular/core';
import { ChartOptions } from '@app/models/apex-charts';
import { ApexAxisChartSeries } from 'ng-apexcharts';

interface DonutChart {
  title?: string;
  labels?: string[];
  series?: number[];
}

interface BarChart {
  title?: string;
  series?: ApexAxisChartSeries;
  xaxis?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApexChartsService {
  constructor() {}

  private colors = [
    'var(--green-color)',
    'var(--yellow-color)',
    'var(--red-color)',
    'var(--blue-color)',
    'var(--purple-color)',
    'var(--orange-color)',
  ];

  getDonut({ title, labels, series }: DonutChart = {}) {
    return {
      title: title && {
        text: title,
        align: 'center',
      },
      labels: labels || [],
      series: series || [],
      chart: {
        type: 'donut',
        height: 220,
      },
      colors: this.colors,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
              },
            },
          },
        },
      },
      legend: {
        show: false,
        position: 'bottom',
      },
    } as ChartOptions;
  }

  getColumm({ title, series, xaxis }: BarChart = {}) {
    return {
      title: title && {
        text: title,
        align: 'center',
      },
      series: series || [],
      xaxis: {
        categories: xaxis || [],
      },
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      colors: ['var(--green-color)', 'var(--yellow-color)', 'var(--red-color)'],
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
    } as ChartOptions;
  }
}
