import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { InfoPageComponent } from './info-page/info-page.component';
import { MyMainPageComponent } from './my-main-page/my-main-page.component';
import { PasswordPageComponent } from './password-page/password-page.component';

const routes: Routes = [
  {
    path: '', component: MyMainPageComponent, canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: URLS.MY_PAGE.INFO, pathMatch: 'full' },
      { path: PAGE_NAMES.MY_PAGE.INFO, component: InfoPageComponent },
      { path: PAGE_NAMES.MY_PAGE.PASSWORD, component: PasswordPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPagesRoutingModule {
}
