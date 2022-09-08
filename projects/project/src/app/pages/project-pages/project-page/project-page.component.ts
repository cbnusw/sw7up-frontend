import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { AuthService, OPERATOR_ROLES } from 'shared';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProject } from '../../../types';

@Component({
  selector: 'sw-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit, OnDestroy {

  pending = false;
  project: IProject;
  private _subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _headerService: HeaderService,
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) {
  }

  get editable(): boolean {
    return OPERATOR_ROLES.indexOf(this._auth.me?.role) !== -1 || this._auth.me?.info?._id === this.project?.creator?._id;
  }

  reload(): void {
    this.pending = true;
    this._projectService.getProject(this.project._id).pipe(
      map(res => res.data),
      finalize(() => this.pending = false)
    ).subscribe({
      next: project => this.project = project,
      error: err => {
        alert(`Error: ${err?.error?.code || err?.message}`);
        this.redirectRouter.redirect();
      },
    });
  }

  removeProject(): void {
    const yes = confirm(`프로젝트를 삭제하시겠습니까?`);
    if (yes) {
      this._projectService.removeProject(this.project._id).subscribe({
        next: () => this.redirectRouter.exitProjectPage(),
        error: err => alert(`프로젝트 삭제에 실패하였습니다.\nError: ${err?.error?.code || err?.message}`),
      });
    }
  }

  ngOnInit(): void {
    this._headerService.hidden = true;

    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => {
          this.pending = true;
          return this._projectService.getProject(id).pipe(finalize(() => this.pending = false));
        }),
        map(res => res.data)
      ).subscribe({
        next: project => this.project = project,
        error: err => {
          alert(`Error: ${err?.error?.code || err?.message}`);
          this.redirectRouter.redirect();
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
