import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../page/page.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CodeViewerModalComponent } from './components/code-viewer-modal/code-viewer-modal.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { CodeLinesPipe } from './pipes/code-lines.pipe';



@NgModule({
  declarations: [
    SourceListComponent,
    CodeViewerModalComponent,
    CodeLinesPipe
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
