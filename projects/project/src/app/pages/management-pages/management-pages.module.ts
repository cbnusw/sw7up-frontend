import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { LanguageModule } from '../../features/language';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementPagesRoutingModule } from './management-pages-routing.module';
import { StepUpFilterComponent } from './management-step-up-page/components/step-up-filter/step-up-filter.component';
import { StepUpListComponent } from './management-step-up-page/components/step-up-list/step-up-list.component';
import { StudentListComponent } from './management-students-page/components/student-list/student-list.component';
import { StudentFilterComponent } from './management-students-page/components/student-filter/student-filter.component';
import { ManagementStudentsPageComponent } from './management-students-page/management-students-page.component';
import { ProjectFilterComponent } from './management-projects-page/components/project-filter/project-filter.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { ManagementRankingPageComponent } from './management-ranking-page/management-ranking-page.component';
import { ManagementStatisticsPageComponent } from './management-statistics-page/management-statistics-page.component';
import { ProjectListComponent } from './management-projects-page/components/project-list/project-list.component';
import { Nl2brPipe } from './management-projects-page/pipes/nl2br.pipe';
import { ManagementStepUpPageComponent } from './management-step-up-page/management-step-up-page.component';
import { TopcitFilterComponent } from './management-topcit-page/components/topcit-filter/topcit-filter.component';
import { TopcitListComponent } from './management-topcit-page/components/topcit-list/topcit-list.component';
import { TopcitStatFilterComponent } from './management-topcit-page/components/topcit-stat-filter/topcit-stat-filter.component';
import { TopcitStatListComponent } from './management-topcit-page/components/topcit-stat-list/topcit-stat-list.component';
import { ManagementTopcitPageComponent } from './management-topcit-page/management-topcit-page.component';
import { TopcitStatSortPipe } from './management-topcit-page/pipes/topcit-stat-sort.pipe';


@NgModule({
  declarations: [
    ManagementMainPageComponent,
    ManagementStatisticsPageComponent,
    ManagementProjectsPageComponent,
    ProjectFilterComponent,
    ProjectListComponent,
    Nl2brPipe,
    ManagementLanguagesPageComponent,
    ManagementRankingPageComponent,
    ManagementStudentsPageComponent,
    StudentFilterComponent,
    StudentListComponent,
    ManagementTopcitPageComponent,
    TopcitFilterComponent,
    TopcitListComponent,
    TopcitStatFilterComponent,
    TopcitStatListComponent,
    TopcitStatSortPipe,
    ManagementStepUpPageComponent,
    StepUpFilterComponent,
    StepUpListComponent,
  ],
  imports: [
    CommonModule,
    ManagementPagesRoutingModule,
    MainModule,
    ControlsModule,
    LanguageModule,
    FormsModule,
  ],
})
export class ManagementPagesModule {
}
