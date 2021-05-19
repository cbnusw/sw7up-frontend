import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackgroundModule } from 'ui';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationDesktopComponent } from './components/navigation-desktop/navigation-desktop.component';
import { NavigationMobileComponent } from './components/navigation-mobile/navigation-mobile.component';
import { PageNavigatorComponent } from './components/page-navigator/page-navigator.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationDesktopComponent,
    NavigationMobileComponent,
    FooterComponent,
    PageNavigatorComponent,
    BreadcrumbComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BackgroundModule,
  ],
  exports: [
    HeaderComponent,
    NavigationDesktopComponent,
    NavigationMobileComponent,
    FooterComponent,
    PageNavigatorComponent,
    PrivacyComponent
  ]
})
export class CoreModule { }
