import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubjectAxis } from '@app/models/subject';
import { AxisService } from '@app/services/axis.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-exams-detail-properties',
  templateUrl: './exams-detail-properties.component.html',
  styleUrls: ['./exams-detail-properties.component.scss'],
})
export class ExamsDetailPropertiesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private axisService: AxisService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  isTablet = window.innerWidth < 768;
  loading = false;
  loadingActions = '';
  error = 0;
  axes: SubjectAxis[] = [];

  formDetail = this.fb.group({
    title: ['', Validators.required],
    observations: [''],
  });

  requirementsForm = this.fb.group({
    new_axis: this.fb.control(0, Validators.min(1)),
    axis_list: this.fb.array([this.axisWeights(0)]),

    totalQuestions: [null, [Validators.required, Validators.min(1)]],

    // Grau de Dificuldade
    useDifficulty: [false],
    easyPercentage: [0],
    mediumPercentage: [0],
    hardPercentage: [0],

    // Tipo de Questão Objetiva
    useQuestionType: [false],
    singleAnswerPercentage: [0],
    incompleteStatementPercentage: [0],
    multipleAnswerPercentage: [0],
    interpretationPercentage: [0],
    assertionReasonPercentage: [0],

    // Habilidade Cognitiva
    useCognitiveSkill: [false],
    rememberPercentage: [0],
    understandPercentage: [0],
    applyPercentage: [0],
    analyzePercentage: [0],
    evaluatePercentage: [0],
    createPercentage: [0],

    // Eixo de Formação
    useFormationAxis: [false],
    infrastructurePercentage: [0],
    softwareSystemsPercentage: [0],
    advancedComputingPercentage: [0],
    scienceTechSocietyPercentage: [0],
    professionalIntegrationPercentage: [0],

    // Reaproveitamento
    useReuse: [false],
    newQuestionsStartDate: [null],
    newQuestionsEndDate: [null],
    usedQuestionsStartDate: [null],
    usedQuestionsEndDate: [null],
    newQuestionsPercentage: [0],
    usedQuestionsPercentage: [0],
  });

  ngOnInit() {
    this.loading = true;
    this.handleDeleteAxisClick(0);
    this.getAxis();
  }

  getExam() {
    this.loading = false;
  }

  getAxis() {
    this.axisService.getAxes().subscribe({
      next: (response) => {
        this.axes = response;
        if (this.id) {
          this.getExam();
          return;
        }

        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  handleFormSubmit(draft: boolean, auto: boolean) {
    const axisList = this.axisList.getRawValue();
    if (!draft && axisList.length === 0) {
      this.notifier.notify('error', 'Deve selecionar pelo menos um eixo.');
      return;
    }

    this.notifier.notify('success', `${draft ? 'Com' : 'Sem'} rascunho.`);
    this.notifier.notify(
      'success',
      `Geração ${auto ? 'automática' : 'manual'}`
    );
  }

  handleRequirementsFormSubmit() {
    // if (this.axesWeightsForm.controls.new_axis.invalid) {
    //   this.axesWeightsForm.controls.new_axis.markAsTouched();
    //   return;
    // }
    // const axisId = this.axesWeightsForm.value.new_axis as number;
    // this.axesWeightsForm.controls.new_axis.reset();
    // this.axisList.push(this.axisWeights(axisId));
  }

  axisName(id?: number | null) {
    return this.axes.find((axis) => axis.id === id)?.name;
  }

  axisWeights(id: number) {
    return this.fb.group({
      axis: this.fb.control(id, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      easy: this.fb.control(5, { nonNullable: true }),
      medium: this.fb.control(5, { nonNullable: true }),
      hard: this.fb.control(5, { nonNullable: true }),
    });
  }

  handleDeleteAxisClick(index: number) {
    this.axisList.removeAt(index);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isTablet = window.innerWidth < 768;
  }

  get filteredAxis() {
    const usedAxis = this.axisList.value.map((axis) => axis.axis);
    return this.axes.filter((axis) => !usedAxis.includes(axis.id));
  }

  get axisList() {
    return this.requirementsForm.controls.axis_list;
  }

  // TUDO ABAIXO FOI GERADO POR IA E NÃO FOI REVISADO
  getDifficultyTotal(): number {
    const form = this.requirementsForm;
    return (
      (form.get('easyPercentage')?.value || 0) +
      (form.get('mediumPercentage')?.value || 0) +
      (form.get('hardPercentage')?.value || 0)
    );
  }

  getQuestionTypeTotal(): number {
    const form = this.requirementsForm;
    return (
      (form.get('singleAnswerPercentage')?.value || 0) +
      (form.get('incompleteStatementPercentage')?.value || 0) +
      (form.get('multipleAnswerPercentage')?.value || 0) +
      (form.get('interpretationPercentage')?.value || 0) +
      (form.get('assertionReasonPercentage')?.value || 0)
    );
  }

  getCognitiveSkillTotal(): number {
    const form = this.requirementsForm;
    return (
      (form.get('rememberPercentage')?.value || 0) +
      (form.get('understandPercentage')?.value || 0) +
      (form.get('applyPercentage')?.value || 0) +
      (form.get('analyzePercentage')?.value || 0) +
      (form.get('evaluatePercentage')?.value || 0) +
      (form.get('createPercentage')?.value || 0)
    );
  }

  getFormationAxisTotal(): number {
    const form = this.requirementsForm;
    return (
      (form.get('infrastructurePercentage')?.value || 0) +
      (form.get('softwareSystemsPercentage')?.value || 0) +
      (form.get('advancedComputingPercentage')?.value || 0) +
      (form.get('scienceTechSocietyPercentage')?.value || 0) +
      (form.get('professionalIntegrationPercentage')?.value || 0)
    );
  }

  getReuseTotal(): number {
    const form = this.requirementsForm;
    return (
      (form.get('newQuestionsPercentage')?.value || 0) +
      (form.get('usedQuestionsPercentage')?.value || 0)
    );
  }
}
