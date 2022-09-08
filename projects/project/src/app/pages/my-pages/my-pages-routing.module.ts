import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGithubAccountsPageComponent } from './my-github-accounts-page';
import { MyMainPageComponent } from './my-main-page';
import { MyProjectsPageComponent } from './my-projects-page';
import { MyReportPageComponent } from './my-report-page';
import { MyStatisticsPageComponent } from './my-statistics-page';


const routes: Routes = [
  {
    path: '', component: MyMainPageComponent, children: [
      { path: '', redirectTo: '/my-page/statistics', pathMatch: 'full' },
      { path: 'statistics', component: MyStatisticsPageComponent },
      { path: 'projects', component: MyProjectsPageComponent },
      { path: 'github', component: MyGithubAccountsPageComponent },
      { path: 'report', component: MyReportPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPagesRoutingModule {
}
