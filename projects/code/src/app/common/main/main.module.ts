import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ExpandableMenuItemComponent } from './expandable-menu-item/expandable-menu-item.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    ExpandableMenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent
  ]
})
export class MainModule { }
