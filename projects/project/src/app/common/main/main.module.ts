import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls';
import { HeaderComponent, PendingComponent, ResponsiveContainerComponent, SectionComponent } from './components';
import { RedirectRouterLinkDirective } from './directives/redirect-router-link.directive';
import { ScrollBottomDirective } from './directives/scroll-bottom.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    ResponsiveContainerComponent,
    SectionComponent,
    PendingComponent,
    RedirectRouterLinkDirective,
    ScrollBottomDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    ControlsModule
  ],
  exports: [
    HeaderComponent,
    ResponsiveContainerComponent,
    SectionComponent,
    PendingComponent,
    RedirectRouterLinkDirective,
    ScrollBottomDirective,
  ]
})
export class MainModule {
}
