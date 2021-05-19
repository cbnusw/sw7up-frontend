import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QnaDetailPageComponent } from './qna-detail-page/qna-detail-page.component';
import { QnaListPageComponent } from './qna-list-page/qna-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/e-help/list', pathMatch: 'full' },
  { path: 'list', component: QnaListPageComponent },
  { path: 'detail/:id', component: QnaDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EHelpDeskPagesRoutingModule {
}
