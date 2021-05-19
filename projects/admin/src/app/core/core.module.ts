import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FileModule } from 'ui';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FileSelectorComponent } from './controls/file-selector/file-selector.component';
import { SideNavService } from './services/side-nav.service';


@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent,
    FileSelectorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    FileModule,
    DragDropModule
  ],
  exports: [
    SideNavComponent,
    HeaderComponent,
    FileSelectorComponent
  ],
  providers: [
    SideNavService
  ]
})
export class CoreModule {
}
