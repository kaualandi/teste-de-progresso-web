import { Component, OnInit } from '@angular/core';
import { ApexChartsService } from '@app/services/apex-charts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private apexCharts: ApexChartsService) {}

  loading = false;
  filtering = false;
  difficultyChart = this.apexCharts.getDonut({
    title: 'Questões por dificuldade',
    labels: ['Fácil', 'Médio', 'Difícil'],
    series: [44, 55, 41],
  });

  cognitiveChart = this.apexCharts.getDonut({
    title: 'Questões por habilidade cognitiva',
    labels: [
      'Recordar',
      'Compreender',
      'Aplicar',
      'Analisar',
      'Avaliar',
      'Criar',
    ],
    series: [44, 55, 41, 17, 15, 12],
  });

  subjectsChart = this.apexCharts.getColumm({
    title: 'Questões por assunto',
    series: [{ data: [44, 55, 41, 17, 15, 12], name: 'Questões' }],
    xaxis: [
      'Matemática',
      'Português',
      'História',
      'Geografia',
      'Biologia',
      'Química',
    ],
  });

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 600);
  }
}
