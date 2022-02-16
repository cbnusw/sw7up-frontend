import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { SwiperModule } from 'swiper/angular';
import { ControlsModule } from '../../common/controls/controls.module';
import { MediaModule } from '../../common/media/media.module';
import { PageModule } from '../../common/page/page.module';
import { SourceCodeModule } from '../../common/source-code/source-code.module';
import { UtilitiesModule } from '../../common/utilities/utilities.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectSummaryItemComponent } from './components/project-summary-item/project-summary-item.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { LanguageManagementPageComponent } from './language-management-page/language-management-page.component';
import { LocalProjectFormPageComponent } from './local-project-form-page/local-project-form-page.component';
import { LocalProjectManagementPageComponent } from './local-project-management-page/local-project-management-page.component';

import { ProjectManagementPagesRoutingModule } from './project-management-pages-routing.module';
import { ProjectPageComponent } from './project-page/project-page.component';
import { PublicProjectFormPageComponent } from './public-project-form-page/public-project-form-page.component';
import { PublicProjectManagementPageComponent } from './public-project-management-page/public-project-management-page.component';


@NgModule({
  declarations: [
    LocalProjectManagementPageComponent,
    PublicProjectManagementPageComponent,
    ProjectListComponent,
    LocalProjectFormPageComponent,
    ProjectPageComponent,
    ProjectSummaryComponent,
    ProjectSummaryItemComponent,
    PublicProjectFormPageComponent,
    LanguageManagementPageComponent,
  ],
  imports: [
    CommonModule,
    ProjectManagementPagesRoutingModule,
    PageModule,
    ControlsModule,
    ReactiveFormsModule,
    MediaModule,
    SwiperModule,
    UtilitiesModule,
    SourceCodeModule,
    PlotlyViaCDNModule,
    NgxChartsModule,
    FormsModule,
  ]
})
export class ProjectManagementPagesModule { }
