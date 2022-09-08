import { Component, OnInit } from '@angular/core';
import { RedirectRouterService } from '../../../../services';
import { ProjectListService } from '../../services';

@Component({
  selector: 'sw-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrls: ['./project-cards.component.scss']
})
export class ProjectCardsComponent implements OnInit {

  constructor(
    public projectListService: ProjectListService,
    private _redirectRouter: RedirectRouterService
  ) {
  }

  ngOnInit(): void {
  }

  async moveProjectPage(id: string): Promise<void> {
    await this._redirectRouter.navigateProjectPage(id);
  }
}
