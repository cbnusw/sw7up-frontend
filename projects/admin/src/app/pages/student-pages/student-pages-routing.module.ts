import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailPageComponent } from './student-detail-page/student-detail-page.component';
import { StudentListPageComponent } from './student-list-page/student-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/student/list', pathMatch: 'full' },
  { path: 'list', component: StudentListPageComponent },
  { path: 'detail/:id', component: StudentDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPagesRoutingModule {
}
