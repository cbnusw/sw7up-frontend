import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentActivityFormPageComponent } from './student-activity-form-page/student-activity-form-page.component';
import { StudentActivityListPageComponent } from './student-activity-list-page/student-activity-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/student-activity/list', pathMatch: 'full' },
  { path: 'list', component: StudentActivityListPageComponent },
  { path: 'new', component: StudentActivityFormPageComponent },
  { path: 'edit/:id', component: StudentActivityFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentActivityPagesRoutingModule {
}
