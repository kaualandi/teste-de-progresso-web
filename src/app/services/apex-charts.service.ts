import { Injectable } from '@angular/core';
import { ChartOptions } from '@app/models/apex-charts';

interface DonutChart {
  title?: string;
  labels?: string[];
  series?: number[];
}

interface BarChart {
  title?: string;
  series?: { data: number[]; name?: string }[];
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
      },
      labels: labels || [],
      series: series || [],
      chart: {
        type: 'donut',
        height: 350,
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
    } as ChartOptions;
  }

  getColumm({ title, series, xaxis }: BarChart = {}) {
    return {
      title: title && {
        text: title,
      },
      series: series || [],
      xaxis: {
        categories: xaxis || [],
      },
      chart: {
        type: 'bar',
        height: 350,
      },
      colors: this.colors,
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
    } as ChartOptions;
  }
}
