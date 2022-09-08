import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProjectDocument } from '../../../../types';

@Component({
  selector: 'sw-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss']
})
export class ProjectDocumentsComponent implements OnInit {

  @Input() documents: IProjectDocument[] = [];
  @Input() editable = false;
  @Output() documentRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
