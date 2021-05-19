import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundBlendModeDirective } from './directives/background-blend-mode.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { BackgroundImageDirective } from './directives/background-image.directive';
import { BackgroundPositionDirective } from './directives/background-position.directive';
import { BackgroundRepeatDirective } from './directives/background-repeat.directive';
import { BackgroundSizeDirective } from './directives/background-size.directive';


@NgModule({
  declarations: [
    BackgroundColorDirective,
    BackgroundImageDirective,
    BackgroundPositionDirective,
    BackgroundRepeatDirective,
    BackgroundSizeDirective,
    BackgroundBlendModeDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundColorDirective,
    BackgroundImageDirective,
    BackgroundPositionDirective,
    BackgroundRepeatDirective,
    BackgroundSizeDirective,
    BackgroundBlendModeDirective,
  ]
})
export class BackgroundModule {
}
