import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TextareaModule } from 'ui';

import { EHelpDeskPagesRoutingModule } from './e-help-desk-pages-routing.module';
import { QnaListPageComponent } from './qna-list-page/qna-list-page.component';
import { QnaWriterNamePipe } from './pipes/qna-writer-name.pipe';
import { QnaWriterDepartmentPipe } from './pipes/qna-writer-department.pipe';
import { QnaDetailPageComponent } from './qna-detail-page/qna-detail-page.component';


@NgModule({
  declarations: [
    QnaListPageComponent,
    QnaWriterNamePipe,
    QnaWriterDepartmentPipe,
    QnaDetailPageComponent
  ],
  imports: [
    CommonModule,
    EHelpDeskPagesRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    TextareaModule,
    FormsModule,
  ]
})
export class EHelpDeskPagesModule { }
