import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { Components } from './components';
import { StudentNameFilterPipe } from './pipes/student-name-filter.pipe';
import { StudentNoFilterPipe } from './pipes/student-no-filter.pipe';
import { StudentsFilterPipe } from './pipes/students-filter.pipe';
import { ProfessorMainPageComponent } from './professor-main-page/professor-main-page.component';
import { ProfessorPagesRoutingModule } from './professor-pages-routing.module';
import { StudentPageComponent } from './student-page/student-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';

@NgModule({
  declarations: [
    ProfessorMainPageComponent,
    StudentsPageComponent,
    StudentsFilterPipe,
    StudentNameFilterPipe,
    StudentNoFilterPipe,
    StudentPageComponent,
    ...Components,
  ],
  imports: [
    CommonModule,
    ProfessorPagesRoutingModule,
    MainModule,
    ControlsModule,
    FormsModule,
  ]
})
export class ProfessorPagesModule {
}
