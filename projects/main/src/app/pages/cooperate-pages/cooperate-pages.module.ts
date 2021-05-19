import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { CooperatePagesRoutingModule } from './cooperate-pages-routing.module';
import { CooperateMainPageComponent } from './cooperate-main-page/cooperate-main-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { InternshipPageComponent } from './internship-page/internship-page.component';
import { GuardianPageComponent } from './guardian-page/guardian-page.component';
import { StartupPageComponent } from './startup-page/startup-page.component';


@NgModule({
  declarations: [
    CooperateMainPageComponent,
    ProjectPageComponent,
    InternshipPageComponent,
    GuardianPageComponent,
    StartupPageComponent
  ],
  imports: [
    CommonModule,
    CooperatePagesRoutingModule,
    CoreModule
  ]
})
export class CooperatePagesModule { }
