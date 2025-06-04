import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateCenterComponent } from '@app/components/modals/create-center/create-center.component';
import { Center } from '@app/models/course';
import { CourseService } from '@app/services/course.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss'],
})
export class CentersComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  centers: Center[] = [];
  displayedColumns = ['name', 'director', 'created_at', 'actions'];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getCenters();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getCenters();
      });
  }

  getCenters() {
    this.error = 0;
    this.courseService.getCenters(this.filters.value).subscribe({
      next: (response) => {
        this.centers = response;
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

  handleDeleteCenterButton(center: Center) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir centro',
        message: `Tem certeza que deseja excluir ${center.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteCenter(center.id);
    });
  }

  deleteCenter(id: number) {
    this.courseService.deleteCenter(id).subscribe({
      next: () => {
        this.notifier.notify('success', 'Centro excluído com sucesso');
        this.getCenters();
      },
      error: () => {
        this.loadingTable = false;
      },
    });
  }

  handleAddCenterButton() {
    this.dialog.open(CreateCenterComponent);
  }
}
