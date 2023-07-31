import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { FilterModule } from '../../common/filter/filter.module';
import { MainModule } from '../../common/main/main.module';
import { LanguageModule } from '../../features/language';
import { PageSharedModule } from '../shared/page-shared.module';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementPagesRoutingModule } from './management-pages-routing.module';
import { ManagementProjectFiltersComponent } from './management-projects-page/components/management-project-filters/management-project-filters.component';
import { ProjectListComponent } from './management-projects-page/components/project-list/project-list.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { Nl2brPipe } from './management-projects-page/pipes/nl2br.pipe';
import { StepUpFilterComponent } from './management-step-up-page/components/step-up-filter/step-up-filter.component';
import { StepUpListComponent } from './management-step-up-page/components/step-up-list/step-up-list.component';
import { ManagementStepUpPageComponent } from './management-step-up-page/management-step-up-page.component';
import { StudentFiltersComponent } from './management-students-page/components/student-filters/student-filters.component';
import { StudentListComponent } from './management-students-page/components/student-list/student-list.component';
import { ManagementStudentsPageComponent } from './management-students-page/management-students-page.component';
import { TopcitFiltersComponent } from './management-topcit-page/components/topcit-filters/topcit-filters.component';
import { TopcitListComponent } from './management-topcit-page/components/topcit-list/topcit-list.component';
import { TopcitStatFiltersComponent } from './management-topcit-page/components/topcit-stat-filters/topcit-stat-filters.component';
import { TopcitStatListComponent } from './management-topcit-page/components/topcit-stat-list/topcit-stat-list.component';
import { ManagementTopcitPageComponent } from './management-topcit-page/management-topcit-page.component';
import { TopcitStatSortPipe } from './management-topcit-page/pipes/topcit-stat-sort.pipe';


@NgModule({
  declarations: [
    ManagementMainPageComponent,
    ManagementProjectsPageComponent,
    ManagementProjectFiltersComponent,
    ProjectListComponent,
    Nl2brPipe,
    ManagementLanguagesPageComponent,
    ManagementStudentsPageComponent,
    StudentFiltersComponent,
    StudentListComponent,
    ManagementTopcitPageComponent,
    TopcitFiltersComponent,
    TopcitListComponent,
    TopcitStatFiltersComponent,
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
    FilterModule,
    PageSharedModule,
  ],
})
export class ManagementPagesModule {
}
