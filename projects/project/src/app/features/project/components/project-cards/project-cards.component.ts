import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from 'projects/project/src/app/types';
import { ProjectListService } from '../../services';

@Component({
  selector: 'sw-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrls: ['./project-cards.component.scss']
})
export class ProjectCardsComponent implements OnInit {

  constructor(
    public readonly projectListService: ProjectListService,
    private readonly _router: Router,
  ) {
  }

  removeProject(project: IProject): void {
    this.projectListService.removeProject(project._id);
  }

  ngOnInit(): void {
  }

  async moveProjectPage(id: string): Promise<void> {
    await this._router.navigate(['/projects', id], { queryParams: { redirectUrl: this._router.url } });
  }
}
