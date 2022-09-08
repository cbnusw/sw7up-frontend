import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    SemesterChartsComponent
  ],
  imports: [
    CommonModule,
    MyPagesRoutingModule,
    MainModule,
    ControlsModule,
    StatisticsModule,
    ReactiveFormsModule,
    ProjectModule
  ],
  providers: [
    { provide: CounterService, useClass: MyProjectCounterService },
  ]
})
export class MyPagesModule {
}
