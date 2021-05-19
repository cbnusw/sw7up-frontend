import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundModule } from 'ui';
import { CoreModule } from '../../core/core.module';
import { FacilityPageComponent } from './facility-page/facility-page.component';
import { GreetingsPageComponent } from './greetings-page/greetings-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { ObjectivePageComponent } from './objective-page/objective-page.component';
import { OrganizationMainPageComponent } from './organization-main-page/organization-main-page.component';
import { OrganizationPagesRoutingModule } from './organization-pages-routing.module';
import { VisionPageComponent } from './vision-page/vision-page.component';


@NgModule({
  declarations: [
    OrganizationMainPageComponent,
    GreetingsPageComponent,
    ObjectivePageComponent,
    VisionPageComponent,
    FacilityPageComponent,
    MemberPageComponent,
    LocationPageComponent
  ],
  imports: [
    CommonModule,
    OrganizationPagesRoutingModule,
    CoreModule,
    BackgroundModule,
  ]
})
export class OrganizationPagesModule { }
