import { Component, Input, OnInit } from '@angular/core';
import { IMedia } from '../../../types/media';

@Component({
  selector: 'sw-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.scss']
})
export class MediaViewerComponent implements OnInit {

  @Input() media: IMedia;
  @Input() aspect = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
