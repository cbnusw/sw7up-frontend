import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundModule } from 'ui';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';



@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    BackgroundModule,
    RouterModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
