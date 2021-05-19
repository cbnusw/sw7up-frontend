import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BackgroundModule, FileModule } from 'ui';
import { TextareaModule } from '../../../../../ui/src/lib/textarea/textarea.module';
import { PicturesControlComponent } from './components/pictures-control/pictures-control.component';
import { GalleryFormPageComponent } from './gallery-form-page/gallery-form-page.component';
import { GalleryListPageComponent } from './gallery-list-page/gallery-list-page.component';

import { GalleryPagesRoutingModule } from './gallery-pages-routing.module';


@NgModule({
  declarations: [
    GalleryListPageComponent,
    GalleryFormPageComponent,
    PicturesControlComponent
  ],
  imports: [
    CommonModule,
    GalleryPagesRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    BackgroundModule,
    FileModule,
    FormsModule,
    DragDropModule,
    TextareaModule,
  ]
})
export class GalleryPagesModule { }
