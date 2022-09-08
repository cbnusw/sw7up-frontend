import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProjectOss } from '../../../../types';

@Component({
  selector: 'sw-project-oss',
  templateUrl: './project-oss.component.html',
  styleUrls: ['./project-oss.component.scss']
})
export class ProjectOssComponent implements OnInit {

  @Input() editable = false;
  @Input() ossList: IProjectOss[] = [];
  @Output() ossRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
