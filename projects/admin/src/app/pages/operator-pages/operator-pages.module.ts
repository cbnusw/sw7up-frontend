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
import { OperatorDetailPageComponent } from './operator-detail-page/operator-detail-page.component';
import { OperatorListPageComponent } from './operator-list-page/operator-list-page.component';
import { OperatorPagesRoutingModule } from './operator-pages-routing.module';


@NgModule({
  declarations: [
    OperatorListPageComponent,
    OperatorDetailPageComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    OperatorPagesRoutingModule,
    ReactiveFormsModule,
    BackgroundModule,
    MatButtonModule,
  ]
})
export class OperatorPagesModule { }
