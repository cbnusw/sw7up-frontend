import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { GuardianMainPageComponent } from './cooperate-main-page/guardian-main-page.component';
import { GuardianPageComponent } from './guardian-page/guardian-page.component';

const routes: Routes = [
  {
    path: '', component: GuardianMainPageComponent, children: [
      // { path: '', component: GuardianPageComponent },
      { path: '', redirectTo: URLS.GUARDIAN.ONE2ONE, pathMatch: 'full' },
      { path: PAGE_NAMES.GUARDIAN.ONE2ONE, component: GuardianPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardianPagesRoutingModule {
}
