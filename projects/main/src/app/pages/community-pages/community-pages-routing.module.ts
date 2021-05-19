import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { ArchiveDetailPageComponent } from './archive-detail-page/archive-detail-page.component';
import { ArchiveListPageComponent } from './archive-list-page/archive-list-page.component';
import { CommunityMainPageComponent } from './community-main-page/community-main-page.component';
import { EHelpDetailPageComponent } from './e-help-detail-page/e-help-detail-page.component';
import { EHelpFormPageComponent } from './e-help-form-page/e-help-form-page.component';
import { EHelpListPageComponent } from './e-help-list-page/e-help-list-page.component';
import { GalleryDetailPageComponent } from './gallery-detail-page/gallery-detail-page.component';
import { GalleryListPageComponent } from './gallery-list-page/gallery-list-page.component';
import { NewsletterDetailPageComponent } from './newsletter-detail-page/newsletter-detail-page.component';
import { NewsletterListPageComponent } from './newsletter-list-page/newsletter-list-page.component';
import { NoticeDetailPageComponent } from './notice-detail-page/notice-detail-page.component';
import { NoticeListPageComponent } from './notice-list-page/notice-list-page.component';
import { PressDetailPageComponent } from './press-detail-page/press-detail-page.component';
import { PressListPageComponent } from './press-list-page/press-list-page.component';

const routes: Routes = [
  {
    path: '', component: CommunityMainPageComponent, children: [
      { path: '', redirectTo: `${URLS.COMMUNITY.NOTICE}/list`, pathMatch: 'full' },
      { path: PAGE_NAMES.COMMUNITY.NOTICE, component: NoticeListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.NOTICE}/:id`, component: NoticeDetailPageComponent },
      { path: PAGE_NAMES.COMMUNITY.E_HELP, component: EHelpListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.E_HELP}/register`, component: EHelpFormPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.E_HELP}/edit/:id`, component: EHelpFormPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.E_HELP}/detail/:id`, component: EHelpDetailPageComponent },
      { path: PAGE_NAMES.COMMUNITY.PRESS, component: PressListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.PRESS}/:id`, component: PressDetailPageComponent },
      { path: PAGE_NAMES.COMMUNITY.NEWSLETTER, component: NewsletterListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.NEWSLETTER}/:id`, component: NewsletterDetailPageComponent },
      { path: PAGE_NAMES.COMMUNITY.GALLERY, component: GalleryListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.GALLERY}/:id`, component: GalleryDetailPageComponent },
      { path: PAGE_NAMES.COMMUNITY.ARCHIVE, component: ArchiveListPageComponent },
      { path: `${PAGE_NAMES.COMMUNITY.ARCHIVE}/:id`, canActivate: [AuthGuard], component: ArchiveDetailPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityPagesRoutingModule {
}
