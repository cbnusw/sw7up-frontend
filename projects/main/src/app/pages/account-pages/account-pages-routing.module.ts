import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from 'shared';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { AccountMainPageComponent } from './account-main-page/account-main-page.component';
import { FindAccountPageComponent } from './find-account-page/find-account-page.component';
import { InitPasswordPageComponent } from './init-password-page/init-password-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '', component: AccountMainPageComponent, canActivateChild: [NotAuthGuard], children: [
      { path: '', redirectTo: URLS.ACCOUNT.LOGIN, pathMatch: 'full' },
      { path: PAGE_NAMES.ACCOUNT.LOGIN, component: LoginPageComponent },
      { path: PAGE_NAMES.ACCOUNT.JOIN, component: JoinPageComponent },
      { path: PAGE_NAMES.ACCOUNT.FIND, component: FindAccountPageComponent },
      { path: PAGE_NAMES.ACCOUNT.PASSWORD, component: InitPasswordPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPagesRoutingModule {
}
