import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateSubjectComponent } from '@app/components/modals/create-subject/create-subject.component';
import { Subject } from '@app/models/subject';
import { SubjectService } from '@app/services/subject.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  subjects: Subject[] = [];
  displayedColumns = ['name', 'axis', 'category', 'created_at', 'actions'];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getSubjects();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getSubjects();
      });
  }

  getSubjects() {
    this.error = 0;
    this.subjectService.getSubjects(this.filters.value).subscribe({
      next: (response) => {
        this.subjects = response;
        this.loading = false;
        this.loadingTable = false;
      },
      error: (error) => {
        this.loading = false;
        this.loadingTable = false;
        this.error = error.status || 500;
      },
    });
  }

  handleDeleteSubjectButton(subject: Subject) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir assunto',
        message: `Tem certeza que deseja excluir ${subject.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteSubject(subject.id);
    });
  }

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe(() => {
      this.notifier.notify('success', 'Assunto excluído com sucesso');
      this.getSubjects();
    });
  }

  handleAddSubjectButton() {
    this.dialog.open(CreateSubjectComponent);
  }
}
