import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from '../controls/controls.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { MediaModalComponent } from './media-modal/media-modal.component';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import { MediaThumbnailViewerComponent } from './media-thumbnail-viewer/media-thumbnail-viewer.component';



@NgModule({
  declarations: [
    MediaViewerComponent,
    MediaThumbnailViewerComponent,
    MediaModalComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    UtilitiesModule
  ],
  exports: [
    MediaViewerComponent,
    MediaThumbnailViewerComponent,
    MediaModalComponent
  ]
})
export class MediaModule { }
