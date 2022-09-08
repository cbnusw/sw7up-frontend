import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { StudentGuard } from '../../common/guards/student.guard';
import { ProjectDocumentsPageComponent } from './project-documents-page/project-documents-page.component';
import { ProjectFormPageComponent } from './project-form-page/project-form-page.component';
import { ProjectOssPageComponent } from './project-oss-page/project-oss-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectSlidePageComponent } from './project-slide-page/project-slide-page.component';
import { ProjectSourcePageComponent } from './project-source-page/project-source-page.component';
import { ProjectTeamPageComponent } from './project-team-page/project-team-page.component';

const routes: Routes = [
  { path: 'register', canActivate: [StudentGuard], component: ProjectFormPageComponent },
  { path: ':id', component: ProjectPageComponent },
  { path: ':id/basic', canActivate: [AuthGuard], component: ProjectFormPageComponent },
  { path: ':id/source', canActivate: [AuthGuard], component: ProjectSourcePageComponent },
  { path: ':id/slide', canActivate: [AuthGuard], component: ProjectSlidePageComponent },
  { path: ':id/team', canActivate: [AuthGuard], component: ProjectTeamPageComponent },
  { path: ':id/oss', canActivate: [AuthGuard], component: ProjectOssPageComponent },
  { path: ':id/documents', canActivate: [AuthGuard], component: ProjectDocumentsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPagesRoutingModule {
}
