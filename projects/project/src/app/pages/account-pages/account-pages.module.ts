import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainModule } from '../../common/main/main.module';

import { AccountPagesRoutingModule } from './account-pages-routing.module';
import { RegisterGithubAccountComponent } from './register-github-account/register-github-account.component';


@NgModule({
  declarations: [
    RegisterGithubAccountComponent
  ],
  imports: [
    CommonModule,
    AccountPagesRoutingModule,
    MainModule
  ],
})
export class AccountPagesModule {
}
