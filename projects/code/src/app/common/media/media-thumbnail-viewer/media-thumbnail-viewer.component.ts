import { Component, Input, OnInit } from '@angular/core';
import { IMedia } from '../../../types/media';

@Component({
  selector: 'sw-media-thumbnail-viewer',
  templateUrl: './media-thumbnail-viewer.component.html',
  styleUrls: ['./media-thumbnail-viewer.component.scss']
})
export class MediaThumbnailViewerComponent implements OnInit {

  @Input() media: IMedia;

  constructor() {
  }

  ngOnInit(): void {
  }

}
