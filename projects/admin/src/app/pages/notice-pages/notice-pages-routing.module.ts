import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeFormPageComponent } from './notice-form-page/notice-form-page.component';
import { NoticeListPageComponent } from './notice-list-page/notice-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/notice/list', pathMatch: 'full' },
  { path: 'list', component: NoticeListPageComponent },
  { path: 'new', component: NoticeFormPageComponent },
  { path: 'edit/:id', component: NoticeFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticePagesRoutingModule {
}
