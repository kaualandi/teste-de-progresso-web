import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
} from 'ng-apexcharts';

export interface ChartOptions {
  title: ApexTitleSubtitle;
  labels: string[];
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  colors: string[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
}
