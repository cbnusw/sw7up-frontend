import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective, IResponse } from 'shared';
import { ProjectService } from '../../../services/project.service';
import { ILocalProject } from '../../../types/local-project';

@Component({
  selector: 'sw-local-project-form-page',
  templateUrl: './local-project-form-page.component.html',
  styleUrls: ['./local-project-form-page.component.scss']
})
export class LocalProjectFormPageComponent extends AbstractFormDirective<ILocalProject, boolean> implements OnInit {

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }

  get id(): string {
    return this.formGroup.get('_id').value;
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    await this.router.navigateByUrl('/pm/local');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        switchMap(id => id ? this.projectService.getLocalProject(id) : of({ data: null })),
        switchMap(res => {
          this.model = res.data ?? null;
          return res.data ? of(res.data._id) : this.projectService.createProjectId()
            .pipe(map(({ data }) => data as string));
        })
      ).subscribe(id => {
        if (!this.model) {
          this.formGroup.get('_id')?.setValue(id);
        }
      }));
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      _id: [null, [Validators.required]],
      banners: [null],
      name: [null, [Validators.required]],
      grade: [null],
      subject: [null],
      source: [null, [Validators.required]],
      ossList: [null],
      team: [null],
      documents: [null]
    });
  }

  protected requestObservable(m: ILocalProject): Observable<boolean> {
    const observable: Observable<IResponse<ILocalProject | undefined>> = this.modifying ?
      this.projectService.updateLocalProject(this.model._id, m) : this.projectService.createLocalProject(m);
    return observable.pipe(map(res => res.success));
  }

}
