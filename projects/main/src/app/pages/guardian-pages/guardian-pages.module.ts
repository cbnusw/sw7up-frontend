import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { GuardianMainPageComponent } from './cooperate-main-page/guardian-main-page.component';
import { GuardianPageComponent } from './guardian-page/guardian-page.component';

import { GuardianPagesRoutingModule } from './guardian-pages-routing.module';


@NgModule({
  declarations: [
    GuardianMainPageComponent,
    GuardianPageComponent,
  ],
  imports: [
    CommonModule,
    GuardianPagesRoutingModule,
    CoreModule
  ]
})
export class GuardianPagesModule {
}
