import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProjectManagementService } from './services/project-management.service';

@Component({
  selector: 'sw-management-projects-page',
  templateUrl: './management-projects-page.component.html',
  styleUrls: ['./management-projects-page.component.scss']
})
export class ManagementProjectsPageComponent implements OnInit {

  expand = false;
  pending = false;

  constructor(
    public service: ProjectManagementService
  ) {
  }

  ngOnInit(): void {
  }

  download(): void {
    this.pending = true;
    this.service.downloadExcel().pipe(
      finalize(() => this.pending = false)
    ).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `코딩이력관리_${new Date().getTime()}.xlsx`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
