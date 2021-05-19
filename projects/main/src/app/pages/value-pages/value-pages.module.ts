import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { ValuePagesRoutingModule } from './value-pages-routing.module';
import { ValueMainPageComponent } from './value-main-page/value-main-page.component';
import { SpreadPageComponent } from './spread-page/spread-page.component';
import { VolunteerPageComponent } from './volunteer-page/volunteer-page.component';


@NgModule({
  declarations: [
    ValueMainPageComponent,
    SpreadPageComponent,
    VolunteerPageComponent
  ],
  imports: [
    CommonModule,
    ValuePagesRoutingModule,
    CoreModule
  ]
})
export class ValuePagesModule { }
