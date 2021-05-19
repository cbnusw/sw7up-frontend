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
import { ResourcePagesRoutingModule } from './resource-pages-routing.module';
import { ResourceListPageComponent } from './resource-list-page/resource-list-page.component';
import { ResourceFormPageComponent } from './resource-form-page/resource-form-page.component';


@NgModule({
  declarations: [
    ResourceListPageComponent,
    ResourceFormPageComponent
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
    ReactiveFormsModule,
    ResourcePagesRoutingModule,
    CoreModule
  ]
})
export class ResourcePagesModule { }
