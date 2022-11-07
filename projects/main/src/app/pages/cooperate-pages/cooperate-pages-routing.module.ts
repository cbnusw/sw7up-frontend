import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { CooperateMainPageComponent } from './cooperate-main-page/cooperate-main-page.component';
import { FamilyCompanyPageComponent } from './family-company-page/family-company-page.component';
import { GuardianPageComponent } from './guardian-page/guardian-page.component';
import { ImmersionEducationPageComponent } from './immersion-education-page/immersion-education-page.component';
import { InternshipEBookPageComponent } from './internship-e-book-page/internship-e-book-page.component';
import { InternshipPageComponent } from './internship-page/internship-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { StartupPageComponent } from './startup-page/startup-page.component';

const routes: Routes = [
  {
    path: '', component: CooperateMainPageComponent, children: [
      { path: '', redirectTo: URLS.COOPERATE.PROJECT, pathMatch: 'full' },
      { path: PAGE_NAMES.COOPERATE.PROJECT, component: ProjectPageComponent },
      { path: PAGE_NAMES.COOPERATE.INTERNSHIP, component: InternshipPageComponent },
      { path: PAGE_NAMES.COOPERATE.FAMILY_COMPANY, component: FamilyCompanyPageComponent },
      { path: PAGE_NAMES.COOPERATE.IMMERSION_EDUCATION, component: ImmersionEducationPageComponent },
      { path: PAGE_NAMES.COOPERATE.INTERNSHIP_E_BOOK, component: InternshipEBookPageComponent },
      { path: PAGE_NAMES.COOPERATE.GUARDIAN, component: GuardianPageComponent },
      { path: PAGE_NAMES.COOPERATE.STARTUP, component: StartupPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperatePagesRoutingModule {
}
