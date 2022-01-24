import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SectionComponent } from './section/section.component';


@NgModule({
  declarations: [
    PageHeaderComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageHeaderComponent,
    SectionComponent,
  ]
})
export class PageModule { }
