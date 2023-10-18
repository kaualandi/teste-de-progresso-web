import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { IconDirective } from 'src/app/directives/icon.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    ConfirmModalComponent,
    SkeletonLoadingComponent,
    AutocompleteComponent,
  ],
  exports: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    MatButtonModule,
    ConfirmModalComponent,
    SkeletonLoadingComponent,
    AutocompleteComponent,
  ],
})
export class SharedModule {}
