import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorDetailPageComponent } from './operator-detail-page/operator-detail-page.component';
import { OperatorListPageComponent } from './operator-list-page/operator-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/operator/list', pathMatch: 'full' },
  { path: 'list', component: OperatorListPageComponent },
  { path: 'detail/:id', component: OperatorDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorPagesRoutingModule {
}
