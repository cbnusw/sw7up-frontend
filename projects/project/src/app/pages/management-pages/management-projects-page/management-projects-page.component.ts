import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from './services/project-management.service';

@Component({
  selector: 'sw-management-projects-page',
  templateUrl: './management-projects-page.component.html',
  styleUrls: ['./management-projects-page.component.scss'],
  providers: [ProjectManagementService]
})
export class ManagementProjectsPageComponent implements OnInit {

  constructor(
    public service: ProjectManagementService
  ) { }

  ngOnInit(): void {
  }

}
