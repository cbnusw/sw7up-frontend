import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProject } from '../../../types';

@Component({
  selector: 'sw-project-documents-page',
  templateUrl: './project-documents-page.component.html',
  styleUrls: ['./project-documents-page.component.scss']
})
export class ProjectDocumentsPageComponent implements OnInit, OnDestroy {

  project: IProject;
  documentName: string | null = null;
  file: File | null = null;
  private _subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
  ) {
  }

  changeFile(files: File[]): void {
    this.file = files[0];
  }

  addDocument(): void {
    if (!this.documentName) {
      alert('문서명을 입력해주세요.');
      return;
    }
    if (!this.file) {
      alert('문서 파일를 선택해주세요.');
      return;
    }

    this.project.documents = this.project.documents || [];
    this._projectService.addDocument(this.project._id, this.documentName, this.file).pipe(
      map(res => res.data)
    ).subscribe({
      next: document => {
        this.project.documents.push(document);
        this.documentName = this.file = null;
      },
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  removeDocument(index: number): void {
    this._projectService.removeDocument(this.project._id, index).subscribe({
      next: () => this.project.documents.splice(index, 1),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  ngOnInit(): void {
    this._headerService.hidden = true;

    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => this._projectService.getProject(id)),
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
