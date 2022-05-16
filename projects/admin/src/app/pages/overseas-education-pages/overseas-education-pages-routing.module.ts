import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverseasEducationFormPageComponent } from './overseas-education-form-page/overseas-education-form-page.component';
import { OverseasEducationListPageComponent } from './overseas-education-list-page/overseas-education-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/overseas-education/list', pathMatch: 'full' },
  { path: 'list', component: OverseasEducationListPageComponent },
  { path: 'new', component: OverseasEducationFormPageComponent },
  { path: 'edit/:id', component: OverseasEducationFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverseasEducationPagesRoutingModule {
}
