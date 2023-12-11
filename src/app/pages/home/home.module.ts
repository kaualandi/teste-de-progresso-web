import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ZoomableDirective } from 'src/app/directives/zoomable.directive';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [HomeComponent, ZoomableDirective],
})
export class HomeModule {}
