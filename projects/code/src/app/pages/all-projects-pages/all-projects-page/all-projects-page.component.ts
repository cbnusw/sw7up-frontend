import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { IProject } from '../../../types/project';

@Component({
  selector: 'sw-all-projects-page',
  templateUrl: './all-projects-page.component.html',
  styleUrls: ['./all-projects-page.component.scss']
})
export class AllProjectsPageComponent implements OnInit {

  projects: IProject[] = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.search({ limit: 12, sort: '-createdAt' }).subscribe(
      res => {
        this.projects = res.data.documents;
      }
    );
  }

}
