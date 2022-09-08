import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProject } from '../../../types';

@Component({
  selector: 'sw-project-oss-page',
  templateUrl: './project-oss-page.component.html',
  styleUrls: ['./project-oss-page.component.scss']
})
export class ProjectOssPageComponent implements OnInit, OnDestroy {

  project: IProject;
  formGroup: FormGroup;
  submitted = false;

  private _subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      name: [null, [Validators.required]],
      link: [null, [Validators.required]],
      license: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  addOss(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const oss = this.formGroup.getRawValue();
    this._projectService.addOss(this.project._id, oss).subscribe({
      next: () => {
        this.project.ossList = this.project.ossList || [];
        this.project.ossList.push(oss);
        this.formGroup.reset();
      },
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  removeOss(index: number): void {
    this._projectService.removeOss(this.project._id, index).subscribe({
      next: () => this.project.ossList.splice(index, 1),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  ngOnInit(): void {
    this._headerService.hidden = true;
    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => this._projectService.getProject(id)),
        map(res => res.data),
      ).subscribe({
        next: project => this.project = project,
        error: err => {
          alert(`Error: ${err?.error?.code || err?.message}`);
          this.redirectRouter.redirect();
        },
      })
    );

    this._subscription.add(
      this.formGroup.valueChanges.subscribe(() => this.submitted = false)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
