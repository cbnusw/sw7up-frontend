import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextareaModule } from 'ui';
import { Components, Directives } from './index';

@NgModule({
  declarations: [
    ...Components,
    ...Directives,
  ],
  imports: [
    CommonModule,
    TextareaModule,
    OverlayModule
  ],
  exports: [
    ...Components,
    ...Directives,
  ]
})
export class ControlsModule {
}
