import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { ProjectModule } from '../../features/project';
import { CounterService } from '../../features/statistics/services';
import { StatisticsModule } from '../../features/statistics/statistics.module';
import { GithubAccountsComponent, IntroGithubAccountComponent, MyGithubAccountsPageComponent } from './my-github-accounts-page';
import { MyMainPageComponent } from './my-main-page';
import { MyPagesRoutingModule } from './my-pages-routing.module';
import { MyProjectsPageComponent } from './my-projects-page';
import { MyProjectsComponent } from './my-projects-page/components/my-projects/my-projects.component';
import { NoneSourceProjectsComponent } from './my-projects-page/components/none-source-projects/none-source-projects.component';
import { MyReportPageComponent } from './my-report-page';
import { MyReportFilterComponent } from './my-report-page/components/my-report-filter/my-report-filter.component';
import { EndDatePipe } from './my-report-page/pipes/end-date.pipe';
import { GroupProjectsByGradePipe } from './my-report-page/pipes/group-projects-by-grade.pipe';
import { PerformedToSemesterPipe } from './my-report-page/pipes/performed-to-semester.pipe';
import { PerformedToYearPipe } from './my-report-page/pipes/performed-to-year.pipe';
import { SortedLanguageKeysPipe } from './my-report-page/pipes/sorted-language-keys.pipe';
import { MyReportService } from './my-report-page/services/my-report.service';
import { LanguageChartsComponent, MyStatisticsPageComponent, SemesterChartsComponent } from './my-statistics-page';
import { MyProjectCounterService } from './services';


@NgModule({
  declarations: [
    MyMainPageComponent,
    MyProjectsPageComponent,
    MyGithubAccountsPageComponent,
    MyStatisticsPageComponent,
    IntroGithubAccountComponent,
    GithubAccountsComponent,
    NoneSourceProjectsComponent,
    MyProjectsComponent,
    MyReportPageComponent,
    LanguageChartsComponent,
    SemesterChartsComponent,
    MyReportFilterComponent,
    PerformedToSemesterPipe,
    PerformedToYearPipe,
    SortedLanguageKeysPipe,
    GroupProjectsByGradePipe,
    EndDatePipe
  ],
  imports: [
    CommonModule,
    MyPagesRoutingModule,
    MainModule,
    ControlsModule,
    StatisticsModule,
    ReactiveFormsModule,
    ProjectModule,
    FormsModule
  ],
  exports: [
    LanguageChartsComponent
  ],
  providers: [
    { provide: CounterService, useClass: MyProjectCounterService },
    { provide: MyReportService }
  ]
})
export class MyPagesModule {
}
