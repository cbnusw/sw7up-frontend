import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterDetailPageComponent } from './newsletter-detail-page/newsletter-detail-page.component';
import { NewsletterFormPageComponent } from './newsletter-form-page/newsletter-form-page.component';
import { NewsletterListPageComponent } from './newsletter-list-page/newsletter-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/newsletter/list', pathMatch: 'full' },
  { path: 'list', component: NewsletterListPageComponent },
  { path: 'new', component: NewsletterFormPageComponent },
  { path: 'detail/:id', component: NewsletterDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterPagesRoutingModule {
}
