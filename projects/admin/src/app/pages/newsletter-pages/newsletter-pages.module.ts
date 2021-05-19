import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FileModule, InnerHtmlModule } from 'ui';

import { NewsletterPagesRoutingModule } from './newsletter-pages-routing.module';
import { NewsletterListPageComponent } from './newsletter-list-page/newsletter-list-page.component';
import { NewsletterDetailPageComponent } from './newsletter-detail-page/newsletter-detail-page.component';
import { NewsletterFormPageComponent } from './newsletter-form-page/newsletter-form-page.component';


@NgModule({
  declarations: [
    NewsletterListPageComponent,
    NewsletterDetailPageComponent,
    NewsletterFormPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    NewsletterPagesRoutingModule,
    ReactiveFormsModule,
    FileModule,
    InnerHtmlModule
  ]
})
export class NewsletterPagesModule { }
