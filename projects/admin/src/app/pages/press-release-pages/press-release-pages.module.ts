import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PressReleaseListPageComponent } from './press-release-list-page/press-release-list-page.component';
import { PressReleasePagesRoutingModule } from './press-release-pages-routing.module';
import { PressReleaseFormPageComponent } from './press-release-form-page/press-release-form-page.component';


@NgModule({
  declarations: [
    PressReleaseListPageComponent,
    PressReleaseFormPageComponent
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    PressReleasePagesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PressReleasePagesModule { }
