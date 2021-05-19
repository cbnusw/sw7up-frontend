import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TextareaModule } from 'ui';
import { CorruptionReportDetailPageComponent } from './corruption-report-detail-page/corruption-report-detail-page.component';
import { CorruptionReportListPageComponent } from './corruption-report-list-page/corruption-report-list-page.component';
import { CorruptionReportPagesRoutingModule } from './corruption-report-pages-routing.module';


@NgModule({
  declarations: [
    CorruptionReportListPageComponent,
    CorruptionReportDetailPageComponent
  ],
  imports: [
    CommonModule,
    CorruptionReportPagesRoutingModule,
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
export class CorruptionReportPagesModule { }
