import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProjectBanner } from '../../../../types';

@Component({
  selector: 'sw-project-slide-item',
  templateUrl: './project-slide-item.component.html',
  styleUrls: ['./project-slide-item.component.scss']
})
export class ProjectSlideItemComponent implements OnInit {

  @Input() item: IProjectBanner;
  @Input() showPlayButton = false;
  @Output() playChange: EventEmitter<IProjectBanner> = new EventEmitter<IProjectBanner>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
