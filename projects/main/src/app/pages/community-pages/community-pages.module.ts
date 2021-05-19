import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InnerHtmlModule, PaginationModule, TextareaModule } from 'ui';
import { CoreModule } from '../../core/core.module';
import { ArchiveDetailPageComponent } from './archive-detail-page/archive-detail-page.component';
import { ArchiveListPageComponent } from './archive-list-page/archive-list-page.component';
import { CommunityMainPageComponent } from './community-main-page/community-main-page.component';
import { CommunityPagesRoutingModule } from './community-pages-routing.module';
import { EHelpDetailPageComponent } from './e-help-detail-page/e-help-detail-page.component';
import { EHelpListPageComponent } from './e-help-list-page/e-help-list-page.component';
import { GalleryDetailPageComponent } from './gallery-detail-page/gallery-detail-page.component';
import { GalleryListPageComponent } from './gallery-list-page/gallery-list-page.component';
import { NewsletterDetailPageComponent } from './newsletter-detail-page/newsletter-detail-page.component';
import { NewsletterListPageComponent } from './newsletter-list-page/newsletter-list-page.component';
import { NoticeDetailPageComponent } from './notice-detail-page/notice-detail-page.component';
import { NoticeListPageComponent } from './notice-list-page/notice-list-page.component';
import { PressDetailPageComponent } from './press-detail-page/press-detail-page.component';
import { PressListPageComponent } from './press-list-page/press-list-page.component';
import { DownloadUrlPipe } from './pipes/download-url.pipe';
import { EHelpFormPageComponent } from './e-help-form-page/e-help-form-page.component';
import { QnaWriterNamePipe } from './pipes/qna-writer-name.pipe';
import { QnaWriterDepartmentPipe } from './pipes/qna-writer-department.pipe';
import { PasswordDialogComponent } from './dialog/password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    CommunityMainPageComponent,
    NoticeListPageComponent,
    EHelpListPageComponent,
    PressListPageComponent,
    NewsletterListPageComponent,
    GalleryListPageComponent,
    ArchiveListPageComponent,
    ArchiveDetailPageComponent,
    GalleryDetailPageComponent,
    NewsletterDetailPageComponent,
    PressDetailPageComponent,
    EHelpDetailPageComponent,
    NoticeDetailPageComponent,
    DownloadUrlPipe,
    EHelpFormPageComponent,
    QnaWriterNamePipe,
    QnaWriterDepartmentPipe,
    PasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    CommunityPagesRoutingModule,
    CoreModule,
    FormsModule,
    InnerHtmlModule,
    MatDialogModule,
    PaginationModule,
    ReactiveFormsModule,
    TextareaModule,
  ]
})
export class CommunityPagesModule { }
