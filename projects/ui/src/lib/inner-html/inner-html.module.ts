import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerHtmlDirective } from './directives/inner-html.directive';



@NgModule({
  declarations: [
    InnerHtmlDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InnerHtmlDirective
  ]
})
export class InnerHtmlModule { }
