import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CoreModule } from '../../core/core.module';
import { NoticeFormPageComponent } from './notice-form-page/notice-form-page.component';
import { NoticeListPageComponent } from './notice-list-page/notice-list-page.component';
import { NoticePagesRoutingModule } from './notice-pages-routing.module';
import { NoticeAccessPipe } from './pipes/notice-access.pipe';


@NgModule({
  declarations: [
    NoticeListPageComponent,
    NoticeFormPageComponent,
    NoticeAccessPipe
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatTableModule,
    NoticePagesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class NoticePagesModule { }
