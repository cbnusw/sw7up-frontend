import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressReleaseFormPageComponent } from './press-release-form-page/press-release-form-page.component';
import { PressReleaseListPageComponent } from './press-release-list-page/press-release-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/press-release/list', pathMatch: 'full' },
  { path: 'list', component: PressReleaseListPageComponent },
  { path: 'new', component: PressReleaseFormPageComponent },
  { path: 'edit/:id', component: PressReleaseFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressReleasePagesRoutingModule {
}
