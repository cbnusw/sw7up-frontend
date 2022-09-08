import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { ProjectModule } from '../../features/project';
import { StatisticsModule } from '../../features/statistics/statistics.module';
import { ProjectDocumentsPageComponent } from './project-documents-page/project-documents-page.component';
import { ProjectFormPageComponent } from './project-form-page/project-form-page.component';
import { ProjectOssPageComponent } from './project-oss-page/project-oss-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';

import { ProjectPagesRoutingModule } from './project-pages-routing.module';
import { ProjectSlidePageComponent } from './project-slide-page/project-slide-page.component';
import { GithubReposComponent } from './project-source-page/components/github-repos/github-repos.component';
import { LocalSourcesComponent } from './project-source-page/components/local-sources/local-sources.component';
import { ProjectSourcePageComponent } from './project-source-page/project-source-page.component';
import { ProjectTeamPageComponent } from './project-team-page/project-team-page.component';


@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectFormPageComponent,
    ProjectSourcePageComponent,
    ProjectTeamPageComponent,
    ProjectOssPageComponent,
    ProjectDocumentsPageComponent,
    ProjectSlidePageComponent,
    GithubReposComponent,
    LocalSourcesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectPagesRoutingModule,
    MainModule,
    ControlsModule,
    ProjectModule,
    StatisticsModule,
    FormsModule
  ]
})
export class ProjectPagesModule { }
