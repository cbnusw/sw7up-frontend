import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceFormPageComponent } from './resource-form-page/resource-form-page.component';
import { ResourceListPageComponent } from './resource-list-page/resource-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/resource/list', pathMatch: 'full' },
  { path: 'list', component: ResourceListPageComponent },
  { path: 'new', component: ResourceFormPageComponent },
  { path: 'edit/:id', component: ResourceFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcePagesRoutingModule {
}
