import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailPageComponent } from './member-detail-page/member-detail-page.component';
import { MemberListPageComponent } from './member-list-page/member-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/member/list', pathMatch: 'full' },
  { path: 'list', component: MemberListPageComponent },
  { path: 'detail/:id', component: MemberDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPagesRoutingModule {
}
