import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CHECK_TYPES } from '@app/constants/questions';
import { SubjectsChart } from '@app/models/home';
import { QuestionFilter } from '@app/models/question';
import { ApexChartsService } from '@app/services/apex-charts.service';
import { HomeService } from '@app/services/home.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apexCharts: ApexChartsService,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {}

  loading = false;
  error = 0;
  filtering = false;
  subjectsCharts = {} as SubjectsChart;

  barChartType = this.fb.control<'subjects' | 'types'>('subjects', {
    nonNullable: true,
  });

  difficultyChart = this.apexCharts.getDonut({
    title: 'Questões por dificuldade',
    labels: [],
    series: [],
  });

  cognitiveChart = this.apexCharts.getDonut({
    title: 'Questões por habilidade cognitiva',
    labels: [],
    series: [],
  });

  typeChart = this.apexCharts.getDonut({
    title: 'Questões por tipo',
    labels: [],
    series: [],
  });

  subjectsChart = this.apexCharts.getColumm({
    title: 'Habilidade cognitiva por grau dificuldade',
    series: [],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getCharts();
    console.log(CHECK_TYPES.map((type) => type.label));

    this.barChartType.valueChanges.subscribe((value) => {
      if (value === 'types') {
        this.subjectsChart = this.apexCharts.getColumm({
          title: 'Habilidade cognitiva por tipo',
          series: this.subjectsCharts.tipo,
        });
        return;
      }

      this.subjectsChart = this.apexCharts.getColumm({
        title: 'Habilidade cognitiva por grau dificuldade',
        series: this.subjectsCharts.dificuldade,
      });
    });
  }

  getCharts(form?: QuestionFilter) {
    if (form) this.filtering = true;
    this.homeService
      .getDashboard(form)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          this.difficultyChart.labels = response.difficulty_chart.label;
          this.difficultyChart.series = response.difficulty_chart.series;
          this.cognitiveChart.labels = response.cognitive_chart.label;
          this.cognitiveChart.series = response.cognitive_chart.series;
          this.typeChart.labels = response.cognitive_chart.label;
          this.typeChart.series = response.cognitive_chart.series;
          this.subjectsCharts = response.subjects_chart;
          this.subjectsChart.series = this.subjectsCharts.dificuldade;
          this.loading = false;
          this.filtering = false;
        },
        error: (error) => {
          this.error = error.status || 500;
          this.loading = false;
          this.filtering = false;
        },
      });
  }
}
