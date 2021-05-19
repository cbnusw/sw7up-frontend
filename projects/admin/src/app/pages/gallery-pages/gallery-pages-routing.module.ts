import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryFormPageComponent } from './gallery-form-page/gallery-form-page.component';
import { GalleryListPageComponent } from './gallery-list-page/gallery-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/gallery/list', pathMatch: 'full' },
  { path: 'list', component: GalleryListPageComponent },
  { path: 'new', component: GalleryFormPageComponent },
  { path: 'edit/:id', component: GalleryFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryPagesRoutingModule {
}
