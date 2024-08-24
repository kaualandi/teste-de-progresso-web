import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  BLOOM_TAXONOMY,
  CHECK_TYPES,
  QUESTION_DIFFICULTIES,
} from '@app/constants/questions';
import { BloomTaxonomy } from '@app/models/question';
import { Subject, SubjectAxis } from '@app/models/subject';
import { ExamService } from '@app/services/exam.service';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-questions-detail',
  templateUrl: './exam-questions-detail.component.html',
  styleUrls: ['./exam-questions-detail.component.scss'],
})
export class ExamQuestionsDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private examService: ExamService
  ) {}

  loading = false;
  error = 0;
  now = moment();

  difficultys = QUESTION_DIFFICULTIES;
  bloomTaxonomys = BLOOM_TAXONOMY;
  checkTypes = CHECK_TYPES;
  axis: SubjectAxis[] = [];
  subjects: Subject[] = [];

  filters = this.fb.group({
    difficulty: [''],
    axis: [0],
    subject: [0],
    bloom_taxonomy: this.fb.control<BloomTaxonomy | ''>(''),
    check_type: '',
    authorship: this.fb.control(['own', 'other']),
    start_year: [moment().set('year', 2000)],
    end_year: [moment()],
  });

  ngOnInit(): void {
    this.loading = true;
    this.examService.getSubjectsAndAxis().subscribe({
      next: ([subjects, axis]) => {
        this.subjects = subjects;
        this.axis = axis;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  setStartYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.filters.controls.start_year.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.filters.controls.start_year.setValue(ctrlValue);
    datepicker.close();
  }

  setEndYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.filters.controls.end_year.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.filters.controls.end_year.setValue(ctrlValue);
    datepicker.close();
  }
}
