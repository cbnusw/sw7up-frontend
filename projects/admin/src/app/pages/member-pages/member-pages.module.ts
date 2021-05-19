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
import { MemberListPageComponent } from './member-list-page/member-list-page.component';
import { MemberPagesRoutingModule } from './member-pages-routing.module';
import { MemberDetailPageComponent } from './member-detail-page/member-detail-page.component';


@NgModule({
  declarations: [
    MemberListPageComponent,
    MemberDetailPageComponent
  ],
  imports: [
    CommonModule,
    BackgroundModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MemberPagesRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class MemberPagesModule { }
