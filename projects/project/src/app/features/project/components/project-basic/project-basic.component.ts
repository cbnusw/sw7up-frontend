import { Component, Input, OnInit } from '@angular/core';
import { IProject, IProjectMento } from '../../../../types';

@Component({
  selector: 'sw-project-basic',
  templateUrl: './project-basic.component.html',
  styleUrls: ['./project-basic.component.scss']
})
export class ProjectBasicComponent implements OnInit {

  @Input() project: IProject;

  constructor() { }

  get mentoList(): IProjectMento[] {
    return (this.project?.subject || this.project?.ownProject)?.mentoList || [];
  }

  ngOnInit(): void {
  }
}
