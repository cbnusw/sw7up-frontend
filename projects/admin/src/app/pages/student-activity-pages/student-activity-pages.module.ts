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

import { StudentActivityPagesRoutingModule } from './student-activity-pages-routing.module';
import { StudentActivityListPageComponent } from './student-activity-list-page/student-activity-list-page.component';
import { StudentActivityFormPageComponent } from './student-activity-form-page/student-activity-form-page.component';


@NgModule({
  declarations: [
    StudentActivityListPageComponent,
    StudentActivityFormPageComponent
  ],
  imports: [
    CommonModule,
    StudentActivityPagesRoutingModule,
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
export class StudentActivityPagesModule { }
