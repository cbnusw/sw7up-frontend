import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, AuthService, IListResponse, IParams } from 'shared';
import { ProjectService } from '../../../../services/project.service';
import { IProject } from '../../../../types/project';

@Component({
  selector: 'sw-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends AbstractSearchDirective<IProject> {

  @Input() isPublic = false;

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
    return this.auth.isOperator ?
      this.projectService.search(params, this.isPublic) :
      this.projectService.searchMyProjects(params, this.isPublic);
  }
}
