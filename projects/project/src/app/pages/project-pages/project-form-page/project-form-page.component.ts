import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'bson';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective, AuthService, IResponse, StorageService } from 'shared';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IProject, ISelectOption, PROJECT_TYPES, SEMESTERS, TProjectType } from '../../../types';

@Component({
  selector: 'sw-project-form-page',
  templateUrl: './project-form-page.component.html',
  styleUrls: ['./project-form-page.component.scss']
})
export class ProjectFormPageComponent extends AbstractFormDirective<IProject, boolean> implements OnInit {

  readonly DESCRIPTION_MIN_LENGTH = 10;

  labelWidth = '110px';

  yearOptions: ISelectOption[] = [];
  gradeOptions: ISelectOption[] = [
    { viewValue: '1학년', value: 1 },
    { viewValue: '2학년', value: 2 },
    { viewValue: '3학년', value: 3 },
    { viewValue: '4학년', value: 4 },
    { viewValue: '5학년', value: 5 },
    { viewValue: '6학년', value: 6 },
  ];
  semesterOptions: ISelectOption[] = SEMESTERS.map(semester => ({
    viewValue: semester,
    value: semester,
  }));
  projectTypeOptions: ISelectOption[] = PROJECT_TYPES.map(type => ({ viewValue: type, value: type }));

  constructor(
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _redirectRouter: RedirectRouterService,
    private _auth: AuthService,
    private _projectService: ProjectService,
    private _storage: StorageService,
    fb: FormBuilder
  ) {
    super(fb);
    let year = new Date().getFullYear();
    const boundYear = year - 10;
    while (year >= boundYear) {
      this.yearOptions.push({ viewValue: `${year} 년`, value: year });
      year--;
    }
  }

  get descriptionLength(): number {
    return (this.formGroup.get('description').value || '')
      .replace(/\s+/g, '').length;
  }

  cancel(): void {
    const yes = confirm(`프로젝트 ${this.modifying ? '수정' : '등록'}을 취소하시겠습니까?`);
    if (yes) {
      this._redirectRouter.redirect();
    }
  }

  changeProjectType(type: TProjectType): void {
    if (type === '교과목프로젝트') {
      this.formGroup.get('ownProject').setValue(null);
    } else {
      this.formGroup.get('subject').setValue(null);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.addSubscriptions(
      this._auth.me$.pipe(filter(me => !!me))
        .subscribe(me => {
          this.formGroup.get('school').setValue(me.info.university || '충북대학교');
          this.formGroup.get('department').setValue(me.info.department);
        }),
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => id ? this._projectService.getProject(id) : of({ data: null })),
        map(res => res.data)
      ).subscribe({
        next: project => this.model = project,
        error: err => {
          alert(err?.error?.code || err?.message);
          this._redirectRouter.navigateByUrl('/');
        },
      })
    );
    this._headerService.hidden = true;
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const descriptionMinLength: ValidatorFn = control =>
      (control.value || '').replace(/\s+/g, '').length >= this.DESCRIPTION_MIN_LENGTH ? null : { min: true };

    return fb.group({
      _id: [new ObjectId().toString()],
      name: ['', [Validators.required]],
      school: ['', [Validators.required]],
      department: ['', [Validators.required]],
      grade: [null, [Validators.required]],
      year: [null, [Validators.required]],
      semester: [null, [Validators.required]],
      description: ['', [descriptionMinLength]],
      projectType: [null, [Validators.required]],
      subject: [null],
      ownProject: [null],
    }, {
      validators: [
        form => {
          const type: TProjectType = form.get('projectType').value;
          const subject = form.get('subject').value;
          const ownProject = form.get('ownProject').value;

          if (type === '교과목프로젝트' && !subject) {
            return { subject: true };
          } else if (type === '자체프로젝트' && !ownProject) {
            return { ownProject: true };
          }
          return null;
        }
      ]
    });
  }

  protected requestObservable(m: IProject): Observable<boolean> {
    const observable$: Observable<IResponse<IProject | undefined>> =
      this.modifying ? this._projectService.updateBasic(m._id, m) : this._projectService.create(m);
    return observable$.pipe(map(res => res.success));
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    const { _id } = this.formGroup.getRawValue();
    let yes = false;

    if (!this.model?.source) {
      yes = confirm('아직 프로젝트 소스 파일을 업로드 하지 않았습니다.\n소스 파일을 업로드하시겠습니까?');
      await this._router.navigate(yes ? ['/projects', _id, 'source'] : [this._storage.redirectUrl || '/']);
    } else {
      await this._redirectRouter.redirect();
    }
  }
}
