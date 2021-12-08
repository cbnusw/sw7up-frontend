import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { SwiperModule } from 'swiper/angular';
import { ControlsModule } from '../../common/controls/controls.module';
import { MediaModule } from '../../common/media/media.module';
import { PageModule } from '../../common/page/page.module';
import { SourceCodeModule } from '../../common/source-code/source-code.module';
import { UtilitiesModule } from '../../common/utilities/utilities.module';
import { LocalProjectFormPageComponent } from './local-project-form-page/local-project-form-page.component';
import { LocalProjectListComponent } from './local-project-management-page/components/local-project-list/local-project-list.component';
import { LocalProjectSummaryItemComponent } from './local-project-management-page/components/local-project-summary-item/local-project-summary-item.component';
import { LocalProjectSummaryComponent } from './local-project-management-page/components/local-project-summary/local-project-summary.component';
import { LocalProjectManagementPageComponent } from './local-project-management-page/local-project-management-page.component';
import { LocalProjectPageComponent } from './local-project-page/local-project-page.component';

import { ProjectManagementPagesRoutingModule } from './project-management-pages-routing.module';
import { PublicProjectFormPageComponent } from './public-project-form-page/public-project-form-page.component';
import { PublicProjectListComponent } from './public-project-management-page/components/public-project-list/public-project-list.component';
import { PublicProjectManagementPageComponent } from './public-project-management-page/public-project-management-page.component';
import { PublicProjectPageComponent } from './public-project-page/public-project-page.component';


@NgModule({
  declarations: [
    LocalProjectManagementPageComponent,
    PublicProjectManagementPageComponent,
    LocalProjectListComponent,
    PublicProjectListComponent,
    LocalProjectFormPageComponent,
    LocalProjectPageComponent,
    LocalProjectSummaryComponent,
    LocalProjectSummaryItemComponent,
    PublicProjectPageComponent,
    PublicProjectFormPageComponent,
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
    PlotlyViaCDNModule
  ]
})
export class ProjectManagementPagesModule { }
