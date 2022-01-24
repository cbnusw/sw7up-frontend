import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../page/page.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CodeViewerModalComponent } from './code-viewer-modal/code-viewer-modal.component';
import { SourceListComponent } from './source-list/source-list.component';



@NgModule({
  declarations: [
    SourceListComponent,
    CodeViewerModalComponent
  ],
  imports: [
    CommonModule,
    UtilitiesModule,
    PageModule
  ],
  exports: [
    SourceListComponent,
    CodeViewerModalComponent,
  ]
})
export class SourceCodeModule { }
