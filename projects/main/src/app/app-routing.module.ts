import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_GROUPS, URLS } from './constants/urls';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: URLS.HOME.ROOT, pathMatch: 'full' },
  { path: PAGE_GROUPS.HOME, component: HomePageComponent },
  {
    path: PAGE_GROUPS.ORGANIZATION,
    loadChildren: () => import('./pages/organization-pages/organization-pages.module').then(m => m.OrganizationPagesModule)
  },
  {
    path: PAGE_GROUPS.EDUCATION,
    loadChildren: () => import('./pages/education-pages/education-pages.module').then(m => m.EducationPagesModule)
  },
  {
    path: PAGE_GROUPS.COOPERATE,
    loadChildren: () => import('./pages/cooperate-pages/cooperate-pages.module').then(m => m.CooperatePagesModule)
  },
  {
    path: PAGE_GROUPS.VALUE,
    loadChildren: () => import('./pages/value-pages/value-pages.module').then(m => m.ValuePagesModule)
  },
  {
    path: PAGE_GROUPS.COMMUNITY,
    loadChildren: () => import('./pages/community-pages/community-pages.module').then(m => m.CommunityPagesModule)
  },
  {
    path: PAGE_GROUPS.MY_PAGE,
    loadChildren: () => import('./pages/my-pages/my-pages.module').then(m => m.MyPagesModule)
  },
  {
    path: PAGE_GROUPS.POLICY,
    loadChildren: () => import('./pages/policy-pages/policy-pages.module').then(m => m.PolicyPagesModule)
  },
  {
    path: PAGE_GROUPS.ACCOUNT,
    loadChildren: () => import('./pages/account-pages/account-pages.module').then(m => m.AccountPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
