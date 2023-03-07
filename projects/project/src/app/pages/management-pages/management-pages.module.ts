import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { LanguageModule } from '../../features/language';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementPagesRoutingModule } from './management-pages-routing.module';
import { ProjectFilterComponent } from './management-projects-page/components/project-filter/project-filter.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { ManagementRankingPageComponent } from './management-ranking-page/management-ranking-page.component';
import { ManagementStatisticsPageComponent } from './management-statistics-page/management-statistics-page.component';
import { ProjectListComponent } from './management-projects-page/components/project-list/project-list.component';
import { Nl2brPipe } from './management-projects-page/pipes/nl2br.pipe';


@NgModule({
  declarations: [
    ManagementMainPageComponent,
    ManagementStatisticsPageComponent,
    ManagementProjectsPageComponent,
    ManagementLanguagesPageComponent,
    ManagementRankingPageComponent,
    ProjectFilterComponent,
    ProjectListComponent,
    Nl2brPipe
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
