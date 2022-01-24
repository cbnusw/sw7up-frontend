import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ControlsModule } from '../../common/controls/controls.module';
import { MediaModule } from '../../common/media/media.module';
import { PageModule } from '../../common/page/page.module';
import { SourceCodeModule } from '../../common/source-code/source-code.module';
import { UtilitiesModule } from '../../common/utilities/utilities.module';

import { AllProjectsPageRoutingModule } from './all-projects-page-routing.module';
import { AllProjectsPageComponent } from './all-projects-page/all-projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';


@NgModule({
  declarations: [
    AllProjectsPageComponent,
    ProjectPageComponent
  ],
  imports: [
    CommonModule,
    AllProjectsPageRoutingModule,
    MediaModule,
    ControlsModule,
    SwiperModule,
    PageModule,
    UtilitiesModule,
    SourceCodeModule
  ]
})
export class AllProjectsPageModule { }
