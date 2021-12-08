import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { MyProjectListPageComponent } from './my-project-list-page/my-project-list-page.component';
import { ProjectDetailPageComponent } from './project-detail-page/project-detail-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/project/list', pathMatch: 'full' },
  { path: 'list', component: ProjectListPageComponent },
  { path: 'me', canActivate: [AuthGuard], component: MyProjectListPageComponent },
  { path: ':id', component: ProjectDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPagesRoutingModule {
}
