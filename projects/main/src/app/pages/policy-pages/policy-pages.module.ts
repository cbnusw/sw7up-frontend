import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, TextareaModule } from 'ui';
import { CoreModule } from '../../core/core.module';
import { CleanDetailPageComponent } from './clean-detail-page/clean-detail-page.component';
import { CleanFormPageComponent } from './clean-form-page/clean-form-page.component';
import { CleanPageComponent } from './clean-page/clean-page.component';
import { MyCleanListPageComponent } from './my-clean-list-page/my-clean-list-page.component';
import { PolicyMainPageComponent } from './policy-main-page/policy-main-page.component';
import { PolicyPagesRoutingModule } from './policy-pages-routing.module';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { SitemapPageComponent } from './sitemap-page/sitemap-page.component';


@NgModule({
  declarations: [
    PolicyMainPageComponent,
    PrivacyPageComponent,
    SitemapPageComponent,
    CleanPageComponent,
    CleanFormPageComponent,
    MyCleanListPageComponent,
    CleanDetailPageComponent
  ],
  imports: [
    CommonModule,
    PolicyPagesRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    PaginationModule,
    FormsModule,
    TextareaModule
  ]
})
export class PolicyPagesModule {
}
