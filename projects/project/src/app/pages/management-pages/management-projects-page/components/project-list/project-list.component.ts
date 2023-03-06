import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from '../../services/project-management.service';

@Component({
  selector: 'sw-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    public service: ProjectManagementService
  ) { }

  ngOnInit(): void {
  }

  more(): void {
    if (this.service.total > this.service.documents.length) {
      this.service.more();
    }
  }
}