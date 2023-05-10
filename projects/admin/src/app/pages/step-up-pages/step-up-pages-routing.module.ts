import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepUpManagementPageComponent } from './step-up-management-page/step-up-management-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/step-up/management', pathMatch: 'full' },
  { path: 'management', component: StepUpManagementPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepUpPagesRoutingModule {
}
