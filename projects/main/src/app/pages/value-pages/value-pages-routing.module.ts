import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { SpreadPageComponent } from './spread-page/spread-page.component';
import { ValueMainPageComponent } from './value-main-page/value-main-page.component';
import { VolunteerPageComponent } from './volunteer-page/volunteer-page.component';

const routes: Routes = [
  {
    path: '', component: ValueMainPageComponent, children: [
      { path: '', redirectTo: URLS.VALUE.SPREAD, pathMatch: 'full' },
      { path: PAGE_NAMES.VALUE.SPREAD, component: SpreadPageComponent },
      { path: PAGE_NAMES.VALUE.VOLUNTEER, component: VolunteerPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValuePagesRoutingModule {
}
