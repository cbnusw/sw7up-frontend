import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls';
import { IconsModule } from '../icons/icons.module';
import { Components } from './components';
import { Directives } from './directives';


@NgModule({
  declarations: [
    ...Components,
    ...Directives
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    ControlsModule,
    IconsModule
  ],
  exports: [
    ...Components,
    ...Directives
  ]
})
export class MainModule {
}
