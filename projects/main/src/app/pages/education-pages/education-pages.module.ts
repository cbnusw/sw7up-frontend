import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundModule, InnerHtmlModule } from 'ui';
import { CoreModule } from '../../core/core.module';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { ConvergencePageComponent } from './convergence-page/convergence-page.component';
import { EasyPageComponent } from './easy-page/easy-page.component';
import { EducationMainPageComponent } from './education-main-page/education-main-page.component';

import { EducationPagesRoutingModule } from './education-pages-routing.module';
import { MajorPageComponent } from './major-page/major-page.component';
import { MileagePageComponent } from './mileage-page/mileage-page.component';
import { OnlinePageComponent } from './online-page/online-page.component';
import { OssPageComponent } from './oss-page/oss-page.component';
import { EasyDetailPageComponent } from './easy-detail-page/easy-detail-page.component';
import { StepUpContentComponent } from './step-up-page/components/step-up-content/step-up-content.component';
import { StepUpSubjectComponent } from './step-up-page/components/step-up-subject/step-up-subject.component';
import { StepUpPageComponent } from './step-up-page/step-up-page.component';


@NgModule({
  declarations: [
    EducationMainPageComponent,
    BasicPageComponent,
    MajorPageComponent,
    StepUpPageComponent,
    StepUpSubjectComponent,
    StepUpContentComponent,
    ConvergencePageComponent,
    OnlinePageComponent,
    OssPageComponent,
    EasyPageComponent,
    MileagePageComponent,
    EasyDetailPageComponent
  ],
  imports: [
    CommonModule,
    EducationPagesRoutingModule,
    CoreModule,
    BackgroundModule,
    InnerHtmlModule,
  ]
})
export class EducationPagesModule { }
