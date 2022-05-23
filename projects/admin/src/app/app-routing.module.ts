import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardPageComponent },
  {
    path: 'member',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/member-pages/member-pages.module').then(m => m.MemberPagesModule)
  },
  {
    path: 'student',
    // canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/student-pages/student-pages.module').then(m => m.StudentPagesModule)
  },
  {
    path: 'staff',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/staff-pages/staff-pages.module').then(m => m.StaffPagesModule)
  },
  {
    path: 'operator',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/operator-pages/operator-pages.module').then(m => m.OperatorPagesModule)
  },
  {
    path: 'notice',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/notice-pages/notice-pages.module').then(m => m.NoticePagesModule)
  },
  {
    path: 'overseas-education',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/overseas-education-pages/overseas-education-pages.module').then(m => m.OverseasEducationPagesModule),
  },
  {
    path: 'e-help',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/e-help-desk-pages/e-help-desk-pages.module').then(m => m.EHelpDeskPagesModule)
  },
  {
    path: 'press-release',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/press-release-pages/press-release-pages.module').then(m => m.PressReleasePagesModule)
  },
  {
    path: 'gallery',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/gallery-pages/gallery-pages.module').then(m => m.GalleryPagesModule)
  },
  {
    path: 'resource',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/resource-pages/resource-pages.module').then(m => m.ResourcePagesModule)
  },
  {
    path: 'newsletter',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/newsletter-pages/newsletter-pages.module').then(m => m.NewsletterPagesModule)
  },
  {
    path: 'corruption-report',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/corruption-report-pages/corruption-report-pages.module').then(m => m.CorruptionReportPagesModule)
  },
  {
    path: 'my-page',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/my-pages/my-pages.module').then(m => m.MyPagesModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account-pages/account-pages.module').then(m => m.AccountPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
