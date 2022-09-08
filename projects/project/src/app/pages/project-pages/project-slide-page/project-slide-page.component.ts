import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProjectBanner, IProjectFile } from '../../../types';

@Component({
  selector: 'sw-project-slide-page',
  templateUrl: './project-slide-page.component.html',
  styleUrls: ['./project-slide-page.component.scss']
})
export class ProjectSlidePageComponent implements OnInit, OnDestroy {

  projectId: string;
  pending = false;
  projectName: string;
  slide: IProjectBanner[] = [];

  private _subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
  ) {
  }

  removeSlide(index: number): void {
    const yes = confirm('해당 슬라이드를 삭제하시겠습니까?');
    if (yes) {
      this._projectService.removeBanner(this.projectId, index).subscribe({
        next: () => this.slide.splice(index, 1),
        error: err => alert(`슬라이드 삭제에 실패했습니다.\nError: ${err?.error?.code || err?.message}`),
      });
    }
  }

  addSlide(files: IProjectFile[]): void {
    this.slide.push(...files.map(file => ({ file })));
  }

  addVideoSlide(link: string): void {
    this.slide.push({ link });
  }

  ngOnInit(): void {
    this._headerService.hidden = true;
    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        tap(id => this.projectId = id),
        switchMap(id => {
          this.pending = true;
          return this._projectService.getProject(id)
            .pipe(
              map(res => res.data),
              tap(project => this.projectName = project.name),
              map(project => project.banners),
              finalize(() => this.pending = false)
            );
        }),
      ).subscribe({
        next: slide => this.slide = slide,
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
