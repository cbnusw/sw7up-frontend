import { Component, Input, OnInit } from '@angular/core';
import { IProjectRepository } from '../../../../types';

@Component({
  selector: 'sw-project-repository',
  templateUrl: './project-repository.component.html',
  styleUrls: ['./project-repository.component.scss']
})
export class ProjectRepositoryComponent implements OnInit {

  @Input() repo: IProjectRepository;

  constructor() {
  }

  ngOnInit(): void {
  }

}
