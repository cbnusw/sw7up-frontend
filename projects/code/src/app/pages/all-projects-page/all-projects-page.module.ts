import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProjectsPageRoutingModule } from './all-projects-page-routing.module';
import { AllProjectsPageComponent } from './all-projects-page/all-projects-page.component';


@NgModule({
  declarations: [
    AllProjectsPageComponent
  ],
  imports: [
    CommonModule,
    AllProjectsPageRoutingModule
  ]
})
export class AllProjectsPageModule { }
