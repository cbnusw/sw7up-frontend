import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoHeightDirective } from './directives/auto-height.directive';



@NgModule({
  declarations: [
    AutoHeightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoHeightDirective
  ]
})
export class TextareaModule { }
