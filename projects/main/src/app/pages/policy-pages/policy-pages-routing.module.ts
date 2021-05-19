import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { PAGE_GROUPS, PAGE_NAMES, URLS } from '../../constants/urls';
import { CleanDetailPageComponent } from './clean-detail-page/clean-detail-page.component';
import { CleanFormPageComponent } from './clean-form-page/clean-form-page.component';
import { CleanPageComponent } from './clean-page/clean-page.component';
import { MyCleanListPageComponent } from './my-clean-list-page/my-clean-list-page.component';
import { PolicyMainPageComponent } from './policy-main-page/policy-main-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { SitemapPageComponent } from './sitemap-page/sitemap-page.component';

const routes: Routes = [
  {
    path: '', component: PolicyMainPageComponent, children: [
      { path: '', redirectTo: URLS.POLICY.PRIVACY, pathMatch: 'full' },
      { path: PAGE_NAMES.POLICY.PRIVACY, component: PrivacyPageComponent },
      { path: PAGE_NAMES.POLICY.SITEMAP, component: SitemapPageComponent },
      { path: PAGE_NAMES.POLICY.CLEAN, component: CleanPageComponent },
      { path: `${PAGE_NAMES.POLICY.CLEAN}/list`, canActivate: [AuthGuard], component: MyCleanListPageComponent },
      { path: `${PAGE_NAMES.POLICY.CLEAN}/submit`, canActivate: [AuthGuard], component: CleanFormPageComponent },
      { path: `${PAGE_NAMES.POLICY.CLEAN}/detail/:id`, canActivate: [AuthGuard], component: CleanDetailPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyPagesRoutingModule {
}
