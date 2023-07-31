import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsPageComponent } from '../shared/stats-page/stats-page.component';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { ManagementStepUpPageComponent } from './management-step-up-page/management-step-up-page.component';
import { ManagementStudentsPageComponent } from './management-students-page/management-students-page.component';
import { ManagementTopcitPageComponent } from './management-topcit-page/management-topcit-page.component';

const routes: Routes = [
  {
    path: '', component: ManagementMainPageComponent, children: [
      { path: '', redirectTo: '/management/projects', pathMatch: 'full' },
      { path: 'projects', component: ManagementProjectsPageComponent },
      { path: 'statistics', component: StatsPageComponent },
      { path: 'languages', component: ManagementLanguagesPageComponent },
      { path: 'students', component: ManagementStudentsPageComponent },
      { path: 'topcit', component: ManagementTopcitPageComponent },
      { path: 'step-up', component: ManagementStepUpPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPagesRoutingModule {
}
