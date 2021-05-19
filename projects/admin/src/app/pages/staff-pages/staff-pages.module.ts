import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BackgroundModule } from 'ui';
import { StaffListPageComponent } from './staff-list-page/staff-list-page.component';
import { StaffPagesRoutingModule } from './staff-pages-routing.module';
import { StaffDetailPageComponent } from './staff-detail-page/staff-detail-page.component';


@NgModule({
  declarations: [
    StaffListPageComponent,
    StaffDetailPageComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    StaffPagesRoutingModule,
    BackgroundModule,
    MatButtonModule
  ]
})
export class StaffPagesModule { }
