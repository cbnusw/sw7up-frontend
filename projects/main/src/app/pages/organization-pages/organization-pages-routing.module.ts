import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { FacilityPageComponent } from './facility-page/facility-page.component';
import { GreetingsPageComponent } from './greetings-page/greetings-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { ObjectivePageComponent } from './objective-page/objective-page.component';
import { OrganizationMainPageComponent } from './organization-main-page/organization-main-page.component';
import { VisionPageComponent } from './vision-page/vision-page.component';

const routes: Routes = [
  {
    path: '', component: OrganizationMainPageComponent, children: [
      { path: '', redirectTo: URLS.ORGANIZATION.GREETINGS, pathMatch: 'full' },
      { path: PAGE_NAMES.ORGANIZATION.GREETINGS, component: GreetingsPageComponent },
      { path: PAGE_NAMES.ORGANIZATION.OBJECTIVE, component: ObjectivePageComponent },
      { path: PAGE_NAMES.ORGANIZATION.VISION, component: VisionPageComponent },
      { path: PAGE_NAMES.ORGANIZATION.MEMBER, component: MemberPageComponent },
      { path: PAGE_NAMES.ORGANIZATION.FACILITY, component: FacilityPageComponent },
      { path: PAGE_NAMES.ORGANIZATION.LOCATION, component: LocationPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationPagesRoutingModule {
}
