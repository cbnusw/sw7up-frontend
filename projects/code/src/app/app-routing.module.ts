import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  {
    path: 'projects',
    loadChildren: () => import('./pages/all-projects-pages/all-projects-page.module').then(m => m.AllProjectsPageModule)
  },
  {
    path: 'pm',
    loadChildren: () => import('./pages/project-management-pages/project-management-pages.module').then(m => m.ProjectManagementPagesModule)
  },
  // {
  //   path: 'project',
  //   loadChildren: () => import('./pages/project-pages/project-pages.module').then(m => m.ProjectPagesModule)
  // },
  {
    path: 'account',
    loadChildren: () => import('./pages/account-pages/account-pages.module').then(m => m.AccountPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
