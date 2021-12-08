import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BackgroundModule } from 'ui';
import { GithubProjectListComponent } from './components/github-project-list/github-project-list.component';
import { LocalProjectFormComponent } from './components/local-project-form/local-project-form.component';
import { MyProjectListComponent } from './components/my-project-list/my-project-list.component';
import { RegisterProjectsDialogComponent } from './dialogs/register-projects-dialog/register-projects-dialog.component';
import { MyProjectListPageComponent } from './my-project-list-page/my-project-list-page.component';
import { ProjectDetailPageComponent } from './project-detail-page/project-detail-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';
import { ProjectPagesRoutingModule } from './project-pages-routing.module';
import { GithubAuthorizationComponent } from './components/github-authorization/github-authorization.component';
import { GithubProjectFormComponent } from './components/github-project-form/github-project-form.component';


@NgModule({
  declarations: [
    ProjectListPageComponent,
    MyProjectListPageComponent,
    ProjectDetailPageComponent,
    MyProjectListComponent,
    RegisterProjectsDialogComponent,
    GithubProjectListComponent,
    LocalProjectFormComponent,
    GithubAuthorizationComponent,
    GithubProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectPagesRoutingModule,
    BackgroundModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ]
})
export class ProjectPagesModule { }
