import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { HeaderService } from '../../../common/main/services';
import { SourceTreeComponent } from '../../../features/project';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProject, IProjectFile, ISelectOption, TSourceTree } from '../../../types';

@Component({
  selector: 'sw-project-source-page',
  templateUrl: './project-source-page.component.html',
  styleUrls: ['./project-source-page.component.scss']
})
export class ProjectSourcePageComponent implements OnInit, OnDestroy {

  project: IProject;

  sourceOriginOptions: ISelectOption[] = [
    { viewValue: '로컬 PC', value: false }, { viewValue: '깃헙', value: true }
  ];
  pending = false;
  metaPending = false;

  @ViewChild(SourceTreeComponent) sourceTreeComponent: SourceTreeComponent;

  private readonly _PROJECT_OBSERVER = {
    next: (project: IProject) => {
      this.project = project;
      this._selectAllSourceFiles();
    },
    error: err => {
      alert(err?.error?.code || err.message);
      this.redirectRouter.redirect();
    },
  };

  private _subscription: Subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _headerService: HeaderService
  ) {
  }

  changePending(pending: boolean): void {
    this.pending = pending;
    if (!this.pending) {
      this._projectService.getProject(this.project._id).pipe(
        map(res => res.data)
      ).subscribe(this._PROJECT_OBSERVER);
    }
  }

  reload(): void {
    this.metaPending = true;
    this._projectService.getProject(this.project._id).pipe(
      map(res => res.data),
      finalize(() => this.metaPending = false)
    ).subscribe(this._PROJECT_OBSERVER);
  }

  removeSourceFiles(): void {
    const fileIds = this.sourceTreeComponent.unselectedFiles.map((file: IProjectFile) => file._id);
    this._projectService.removeSourceFiles(this.project._id, fileIds)
      .subscribe({
        next: () => this.reload(),
        error: err => alert(`Error: ${err?.error?.code || err?.message}`)
      });
  }

  ngOnInit(): void {
    this._headerService.hidden = true;

    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => this._projectService.getProject(id)),
        map(res => res.data),
      ).subscribe(this._PROJECT_OBSERVER)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _selectAllSourceFiles(): void {
    function trace(tree: TSourceTree): void {
      tree.forEach(item => {
        if ('dirname' in item) {
          trace(item.entries);
        } else {
          item.selected = true;
        }
      });
    }

    trace(this.project.source || []);
  }
}
