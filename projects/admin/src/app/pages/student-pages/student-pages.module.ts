import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BackgroundModule } from 'ui';
import { StudentPagesRoutingModule } from './student-pages-routing.module';
import { StudentListPageComponent } from './student-list-page/student-list-page.component';
import { StudentDetailPageComponent } from './student-detail-page/student-detail-page.component';


@NgModule({
  declarations: [
    StudentListPageComponent,
    StudentDetailPageComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    StudentPagesRoutingModule,
    BackgroundModule,
    MatButtonModule,
  ]
})
export class StudentPagesModule { }
