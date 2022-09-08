import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { LanguageModule } from '../../features/language';

import { ManagementPagesRoutingModule } from './management-pages-routing.module';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementStatisticsPageComponent } from './management-statistics-page/management-statistics-page.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';


@NgModule({
  declarations: [
    ManagementMainPageComponent,
    ManagementStatisticsPageComponent,
    ManagementProjectsPageComponent,
    ManagementLanguagesPageComponent
  ],
  imports: [
    CommonModule,
    ManagementPagesRoutingModule,
    MainModule,
    ControlsModule,
    LanguageModule,
  ]
})
export class ManagementPagesModule { }
