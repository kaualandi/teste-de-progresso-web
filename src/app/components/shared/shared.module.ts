import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { IconDirective } from 'src/app/directives/icon.directive';
import { InitialLettersDirective } from 'src/app/directives/initial-letters.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { PrevPageDirective } from '../../directives/prev-page.directive';
import { SafePipe } from '../../pipes/safe.pipe';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PasswordStregthComponent } from './password-stregth/password-stregth.component';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  declarations: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    InitialLettersDirective,
    ConfirmModalComponent,
    SkeletonLoadingComponent,
    AutocompleteComponent,
    SafePipe,
    AvatarComponent,
    PrevPageDirective,
    PasswordStregthComponent,
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
    SafePipe,
    InitialLettersDirective,
    AvatarComponent,
    PasswordStregthComponent,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class SharedModule {}
