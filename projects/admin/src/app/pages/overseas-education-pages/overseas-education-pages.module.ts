import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CoreModule } from '../../core/core.module';

import { OverseasEducationPagesRoutingModule } from './overseas-education-pages-routing.module';
import { OverseasEducationListPageComponent } from './overseas-education-list-page/overseas-education-list-page.component';
import { OverseasEducationFormPageComponent } from './overseas-education-form-page/overseas-education-form-page.component';


@NgModule({
  declarations: [
    OverseasEducationListPageComponent,
    OverseasEducationFormPageComponent
  ],
  imports: [
    CommonModule,
    OverseasEducationPagesRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CKEditorModule,
    CoreModule
  ]
})
export class OverseasEducationPagesModule { }
