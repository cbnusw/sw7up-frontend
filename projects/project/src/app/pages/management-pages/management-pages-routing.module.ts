import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementLanguagesPageComponent } from './management-languages-page/management-languages-page.component';
import { ManagementMainPageComponent } from './management-main-page/management-main-page.component';
import { ManagementProjectsPageComponent } from './management-projects-page/management-projects-page.component';
import { ManagementStatisticsPageComponent } from './management-statistics-page/management-statistics-page.component';

const routes: Routes = [
  {
    path: '', component: ManagementMainPageComponent, children: [
      { path: '', redirectTo: '/management/statistics', pathMatch: 'full' },
      { path: 'statistics', component: ManagementStatisticsPageComponent },
      { path: 'languages', component: ManagementLanguagesPageComponent },
      { path: 'projects', component: ManagementProjectsPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPagesRoutingModule {
}
