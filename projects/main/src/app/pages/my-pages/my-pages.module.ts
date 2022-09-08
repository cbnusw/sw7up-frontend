import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { InfoPageComponent } from './info-page/info-page.component';
import { MyMainPageComponent } from './my-main-page/my-main-page.component';

import { MyPagesRoutingModule } from './my-pages-routing.module';
import { PasswordPageComponent } from './password-page/password-page.component';


@NgModule({
  declarations: [
    MyMainPageComponent,
    InfoPageComponent,
    PasswordPageComponent
  ],
  exports: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    MyPagesRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ]
})
export class MyPagesModule { }
