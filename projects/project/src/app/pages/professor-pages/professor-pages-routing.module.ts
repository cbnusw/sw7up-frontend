import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsPageComponent } from '../shared/stats-page/stats-page.component';
import { ProfessorMainPageComponent } from './professor-main-page/professor-main-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';

const routes: Routes = [
  {
    path: '', component: ProfessorMainPageComponent, children: [
      { path: '', redirectTo: '/professor/students', pathMatch: 'full' },
      { path: 'students', component: StudentsPageComponent },
      { path: 'students/:id', component: StudentPageComponent },
      { path: 'stats', component: StatsPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorPagesRoutingModule {
}
