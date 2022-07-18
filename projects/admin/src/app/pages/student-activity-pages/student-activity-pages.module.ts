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
import { StudentActifityListPageComponent } from './student-actifity-list-page/student-actifity-list-page.component';
import { StudentActifityFormPageComponent } from './student-actifity-form-page/student-actifity-form-page.component';


@NgModule({
  declarations: [
    StudentActifityListPageComponent,
    StudentActifityFormPageComponent
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
