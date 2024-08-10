import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { QuestionFilter } from '@app/models/question';
import { Subject } from '@app/models/subject';
import { SubjectService } from '@app/services/subject.service';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class QuestionsFilterComponent implements OnInit {
  @Input() filtering = false;
  @Output() filter = new EventEmitter<QuestionFilter>();
  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService
  ) {}

  loadingSubject = false;
  subjects: Subject[] = [];
  now = moment();

  form = this.fb.group({
    start_year: this.fb.control(moment().set('year', 2000), {
      nonNullable: true,
    }),
    end_year: this.fb.control(moment(), { nonNullable: true }),
    authorship: this.fb.control(['own', 'other'], { nonNullable: true }),
    subjects: this.fb.control<number[]>([], { nonNullable: true }),
  });

  ngOnInit(): void {
    this.getSubjects();
  }

  handleFormSubmit() {
    const value = this.form.getRawValue();
    this.filter.emit({
      ...value,
      start_year: value.start_year.format('YYYY'),
      end_year: value.end_year.format('YYYY'),
    });
  }

  getSubjects() {
    this.loadingSubject = true;
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
        const subjectsIds = response.map((subject) => subject.id);
        this.form.controls.subjects.setValue(subjectsIds);
        this.loadingSubject = false;
      },
      error: () => {
        this.loadingSubject = false;
      },
    });
  }

  setStartYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.form.controls.start_year.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.start_year.setValue(ctrlValue);
    datepicker.close();
  }

  setEndYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.form.controls.end_year.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.end_year.setValue(ctrlValue);
    datepicker.close();
  }
}