import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { QuestionFilter } from '@app/models/question';
import { Subject } from '@app/models/subject';
import { SubjectService } from '@app/services/subject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss'],
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

  setYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>,
    year: 'start_year' | 'end_year'
  ) {
    const ctrlValue = this.form.get(year)?.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.start_year.setValue(ctrlValue);
    datepicker.close();
  }
}
