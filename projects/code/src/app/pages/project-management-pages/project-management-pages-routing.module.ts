import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { LocalProjectFormPageComponent } from './local-project-form-page/local-project-form-page.component';
import { LocalProjectManagementPageComponent } from './local-project-management-page/local-project-management-page.component';
import { LocalProjectPageComponent } from './local-project-page/local-project-page.component';
import { PublicProjectFormPageComponent } from './public-project-form-page/public-project-form-page.component';
import { PublicProjectManagementPageComponent } from './public-project-management-page/public-project-management-page.component';
import { PublicProjectPageComponent } from './public-project-page/public-project-page.component';

const routes: Routes = [
  {
    path: 'local', canActivate: [AuthGuard], component: LocalProjectManagementPageComponent,
  },
  {
    path: 'local/register', canActivate: [AuthGuard], component: LocalProjectFormPageComponent,
  },
  {
    path: 'local/:id', canActivate: [AuthGuard], component: LocalProjectPageComponent,
  },
  {
    path: 'local/:id/edit', canActivate: [AuthGuard], component: LocalProjectFormPageComponent,
  },
  {
    path: 'public', canActivate: [AuthGuard], component: PublicProjectManagementPageComponent,
  },
  {
    path: 'public/register', canActivate: [AuthGuard], component: PublicProjectFormPageComponent,
  },
  {
    path: 'public/:id', canActivate: [AuthGuard], component: PublicProjectPageComponent,
  },
  {
    path: 'public/:id/edit', canActivate: [AuthGuard], component: PublicProjectFormPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementPagesRoutingModule {
}
