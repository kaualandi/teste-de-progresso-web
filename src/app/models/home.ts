export interface DonutChart {
  label: string[];
  series: number[];
}

export interface SubjectChartData {
  x: string;
  y: number;
}

export interface SubjectChartSerie {
  name: string;
  data: SubjectChartData[];
}

export interface SubjectsChart {
  dificuldade: SubjectChartSerie[];
  tipo: SubjectChartSerie[];
}

export interface Dashboard {
  cognitive_chart: DonutChart;
  difficulty_chart: DonutChart;
  subjects_chart: SubjectsChart;
}
