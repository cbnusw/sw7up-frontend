import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '../../core/core.module';
import { AccountMainPageComponent } from './account-main-page/account-main-page.component';

import { AccountPagesRoutingModule } from './account-pages-routing.module';
import { DoneInitPasswordComponent } from './components/done-init-password/done-init-password.component';
import { InitPasswordFormComponent } from './components/init-password-form/init-password-form.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { PrivacyDialogComponent } from './dialogs/privacy-dialog/privacy-dialog.component';
import { FindAccountPageComponent } from './find-account-page/find-account-page.component';
import { InitPasswordPageComponent } from './init-password-page/init-password-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    JoinPageComponent,
    InitPasswordPageComponent,
    FindAccountPageComponent,
    AccountMainPageComponent,
    OtpFormComponent,
    InitPasswordFormComponent,
    DoneInitPasswordComponent,
    PrivacyDialogComponent
  ],
  imports: [
    CommonModule,
    AccountPagesRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class AccountPagesModule { }
