import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '../../../../types';

@Component({
  selector: 'sw-student-project-list',
  templateUrl: './student-project-list.component.html',
  styleUrls: ['./student-project-list.component.scss']
})
export class StudentProjectListComponent {
  @Input() projects: IProject[] = [];

  constructor(public readonly router: Router) {
  }
}
