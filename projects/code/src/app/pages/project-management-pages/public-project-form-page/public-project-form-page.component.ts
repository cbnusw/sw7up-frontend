import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective } from 'shared';
import { ProjectService } from '../../../services/project.service';
import { IPublicProject } from '../../../types/public-project';

@Component({
  selector: 'sw-public-project-form-page',
  templateUrl: './public-project-form-page.component.html',
  styleUrls: ['./public-project-form-page.component.scss']
})
export class PublicProjectFormPageComponent extends AbstractFormDirective<IPublicProject, boolean> implements OnInit {

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }

  get id(): string {
    return this.formGroup.get('_id').value;
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

  protected async processAfterSubmission(s: boolean): Promise<void> {
    await this.router.navigateByUrl('/pm/public');
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      _id: [null, [Validators.required]],
      banners: [null],
      name: [null, [Validators.required]],
      grade: [null],
      subject: [null],
      ossList: [null],
      team: [null],
      documents: [null],
      repo: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IPublicProject): Observable<boolean> {
    return undefined;
  }

}
