import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from '../../common/controls/controls.module';
import { PageModule } from '../../common/page/page.module';

import { AccountPagesRoutingModule } from './account-pages-routing.module';
import { GithubLoginComponent } from './github-account-management-page/components/github-login/github-login.component';
import { GithubAccountManagementPageComponent } from './github-account-management-page/github-account-management-page.component';
import { GithubAccountListComponent } from './github-account-management-page/components/github-account-list/github-account-list.component';


@NgModule({
  declarations: [
    GithubAccountManagementPageComponent,
    GithubLoginComponent,
    GithubAccountListComponent,
  ],
  imports: [
    CommonModule,
    AccountPagesRoutingModule,
    PageModule,
    ControlsModule
  ]
})
export class AccountPagesModule { }
