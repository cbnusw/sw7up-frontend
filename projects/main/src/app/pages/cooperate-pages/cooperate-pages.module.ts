import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CooperateMainPageComponent } from './cooperate-main-page/cooperate-main-page.component';

import { CooperatePagesRoutingModule } from './cooperate-pages-routing.module';
import { GuardianPageComponent } from './guardian-page/guardian-page.component';
import { InternshipEBookPageComponent } from './internship-e-book-page/internship-e-book-page.component';
import { InternshipPageComponent } from './internship-page/internship-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { StartupPageComponent } from './startup-page/startup-page.component';
import { FamilyCompanyPageComponent } from './family-company-page/family-company-page.component';
import { ImmersionEducationPageComponent } from './immersion-education-page/immersion-education-page.component';


@NgModule({
  declarations: [
    CooperateMainPageComponent,
    ProjectPageComponent,
    InternshipPageComponent,
    GuardianPageComponent,
    StartupPageComponent,
    InternshipEBookPageComponent,
    FamilyCompanyPageComponent,
    ImmersionEducationPageComponent
  ],
  imports: [
    CommonModule,
    CooperatePagesRoutingModule,
    CoreModule
  ]
})
export class CooperatePagesModule {
}
