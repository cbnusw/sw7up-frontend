import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDetailPageComponent } from './staff-detail-page/staff-detail-page.component';
import { StaffListPageComponent } from './staff-list-page/staff-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/staff/list', pathMatch: 'full' },
  { path: 'list', component: StaffListPageComponent },
  { path: 'detail/:id', component: StaffDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPagesRoutingModule {
}
