import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StepUpContentFormComponent } from './components/step-up-content-form/step-up-content-form.component';
import { StepUpContentListComponent } from './components/step-up-content-list/step-up-content-list.component';
import { StepUpLevelManagementComponent } from './components/step-up-level-management/step-up-level-management.component';
import { StepUpSubjectManagementComponent } from './components/step-up-subject-mangement/step-up-subject-management.component';
import { StepUpSubjectComponent } from './components/step-up-subject/step-up-subject.component';
import { StepUpContentService } from './services/step-up-content.service';
import { StepUpLevelService } from './services/step-up-level.service';
import { StepUpSubjectService } from './services/step-up-subject.service';
import { StepUpManagementPageComponent } from './step-up-management-page/step-up-management-page.component';
import { StepUpPagesRoutingModule } from './step-up-pages-routing.module';

@NgModule({
  declarations: [
    StepUpLevelManagementComponent,
    StepUpSubjectManagementComponent,
    StepUpSubjectComponent,
    StepUpContentListComponent,
    StepUpContentFormComponent,
    StepUpManagementPageComponent,
  ],
  imports: [
    CommonModule,
    StepUpPagesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
  ],
  exports: [
    StepUpSubjectComponent
  ],
  providers: [
    StepUpLevelService,
    StepUpSubjectService,
    StepUpContentService,
  ]
})
export class StepUpPagesModule {
}
