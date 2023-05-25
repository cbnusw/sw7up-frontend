import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorGuard } from './common/guards/operator.guard';
import { StaffGuard } from './common/guards/staff.guard';
import { StudentGuard } from './common/guards/student.guard';
import { DashboardPageComponent } from './pages/dashboard-page';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  {
    path: 'projects',
    loadChildren: () => import('./pages/project-pages/project-pages.module').then(m => m.ProjectPagesModule),
  },
  {
    path: 'professor',
    canActivateChild: [StaffGuard],
    loadChildren: () => import('./pages/professor-pages/professor-pages.module').then(m => m.ProfessorPagesModule),
  },
  {
    path: 'management',
    canActivateChild: [OperatorGuard],
    loadChildren: () => import('./pages/management-pages/management-pages.module').then(m => m.ManagementPagesModule),
  },
  {
    path: 'my-page',
    canActivateChild: [StudentGuard],
    loadChildren: () => import('./pages/my-pages/my-pages.module').then(m => m.MyPagesModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account-pages/account-pages.module').then(m => m.AccountPagesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
