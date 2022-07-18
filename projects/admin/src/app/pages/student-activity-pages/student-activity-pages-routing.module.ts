import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StudentActivityListPageComponent
} from '../../../../../main/src/app/pages/community-pages/student-activity-list-page/student-activity-list-page.component';
import { StudentActifityFormPageComponent } from './student-actifity-form-page/student-actifity-form-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/student-activity/list', pathMatch: 'full' },
  { path: 'list', component: StudentActivityListPageComponent },
  { path: 'new', component: StudentActifityFormPageComponent },
  { path: 'edit/:id', component: StudentActifityFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentActivityPagesRoutingModule {
}
