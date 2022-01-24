import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'projects/code/src/app/types/project';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, AuthService, IListResponse, IParams } from 'shared';
import { ProjectService } from '../../../../../services/project.service';

@Component({
  selector: 'sw-local-project-list',
  templateUrl: './local-project-list.component.html',
  styleUrls: ['./local-project-list.component.scss']
})
export class LocalProjectListComponent extends AbstractSearchDirective<IProject> {

  constructor(private projectService: ProjectService,
              private auth: AuthService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 12 }, ['name'], route, router);
  }

  getTeamSize(document: IProject): number {
    if (document.team) {
      return (document.team?.member?.github?.length || 0) +
        (document.team?.member?.joined?.length || 0) +
        (document.team?.member?.notJoined?.length || 0);
    }
    return 0;
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IProject>> {
    return this.auth.isOperator ? this.projectService.search(params, false) : this.projectService.searchMyProjects(params, false);
  }

}
