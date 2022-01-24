import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DownloadSourceLinkPipe } from './pipes/download-source-link.pipe';
import { SelectedFilesSizePipe } from './pipes/selected-file-size.pipe';
import { StaticUrlPipe } from './pipes/static-url.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { YoutubePipe } from './pipes/youtube.pipe';
import { YoutubeThumbnailPipe } from './pipes/youtub-thumbnail.pipe';
import { NumSelectedFilesPipe } from './pipes/num-selected-files.pipe';
import { UnidentityPipe } from './pipes/unidentity.pipe';



@NgModule({
  declarations: [
    StaticUrlPipe,
    FileSizePipe,
    YoutubePipe,
    SelectedFilesSizePipe,
    YoutubeThumbnailPipe,
    NumSelectedFilesPipe,
    UnidentityPipe,
    DownloadSourceLinkPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StaticUrlPipe,
    FileSizePipe,
    YoutubePipe,
    SelectedFilesSizePipe,
    YoutubeThumbnailPipe,
    NumSelectedFilesPipe,
    UnidentityPipe,
    DownloadSourceLinkPipe,
  ],
  providers: [
    DecimalPipe
  ]
})
export class UtilitiesModule { }
