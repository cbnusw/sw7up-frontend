import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocalProject } from 'projects/code/src/app/types/local-project';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, AuthService, IListResponse, IParams } from 'shared';
import { ProjectService } from '../../../../../services/project.service';

@Component({
  selector: 'sw-local-project-list',
  templateUrl: './local-project-list.component.html',
  styleUrls: ['./local-project-list.component.scss']
})
export class LocalProjectListComponent extends AbstractSearchDirective<ILocalProject> {

  constructor(private projectService: ProjectService,
              private auth: AuthService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 12 }, ['name'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<ILocalProject>> {
    return this.auth.isOperator ? this.projectService.getLocalProjects(params) : this.projectService.getMyLocalProjects(params);
  }

}
