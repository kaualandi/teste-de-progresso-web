import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { IconDirective } from 'src/app/directives/icon.directive';
import { InitialLettersDirective } from 'src/app/directives/initial-letters.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { PrevPageDirective } from '../../directives/prev-page.directive';
import { StopPropagDirective } from '../../directives/stop-propag.directive';
import { SafePipe } from '../../pipes/safe.pipe';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LangSelectComponent } from './lang-select/lang-select.component';
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
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
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
    SafePipe,
    AvatarComponent,
    PrevPageDirective,
    PasswordStregthComponent,
    StopPropagDirective,
    LangSelectComponent,
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
    SafePipe,
    InitialLettersDirective,
    AvatarComponent,
    PasswordStregthComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    StopPropagDirective,
    TranslateModule,
    LangSelectComponent,
  ],
})
export class SharedModule {}
