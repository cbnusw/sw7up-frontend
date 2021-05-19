import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorruptionReportDetailPageComponent } from './corruption-report-detail-page/corruption-report-detail-page.component';
import { CorruptionReportListPageComponent } from './corruption-report-list-page/corruption-report-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/corruption-report/list', pathMatch: 'full' },
  { path: 'list', component: CorruptionReportListPageComponent },
  { path: 'detail/:id', component: CorruptionReportDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorruptionReportPagesRoutingModule {
}
