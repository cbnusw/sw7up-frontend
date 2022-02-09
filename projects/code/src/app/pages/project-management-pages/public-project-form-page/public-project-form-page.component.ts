import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective, IResponse } from 'shared';
import { ProjectService } from '../../../services/project.service';
import { IProject, IProjectTeam, PROJECT_TYPES, SEMESTERS, TProejctType, TSemester } from '../../../types/project';
import { ISelectOption } from '../../../types/select-option';

@Component({
  selector: 'sw-public-project-form-page',
  templateUrl: './public-project-form-page.component.html',
  styleUrls: ['./public-project-form-page.component.scss']
})
export class PublicProjectFormPageComponent extends AbstractFormDirective<IProject, boolean> implements OnInit {

  semesterOptions: ISelectOption<TSemester>[] = SEMESTERS.map(s => ({ value: s }));

  gradeOptions: ISelectOption<number>[] = [
    { viewValue: '1학년', value: 1 },
    { viewValue: '2학년', value: 2 },
    { viewValue: '3학년', value: 3 },
    { viewValue: '4학년', value: 4 },
    { viewValue: '5학년', value: 5 },
    { viewValue: '6학년', value: 6 },
  ];

  yearOptions: ISelectOption<number>[] = [];

  projectTypeOptions: ISelectOption<TProejctType>[] = PROJECT_TYPES.map(t => ({ value: t }));

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
    let year = new Date().getFullYear();
    const boundYear = year - 10;
    while (year >= boundYear) {
      this.yearOptions.push({ viewValue: `${year} 년`, value: year });
      year--;
    }
  }

  get id(): string {
    return this.formGroup.get('_id').value;
  }

  get projectType(): TProejctType {
    return this.formGroup.get('projectType').value as TProejctType;
  }

  get team(): IProjectTeam {
    return this.formGroup.get('team').value as IProjectTeam;
  }

  changeTeam(team: IProjectTeam): void {
    this.formGroup.get('team').patchValue(team);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        switchMap(id => id ? this.projectService.getProject(id) : of({ data: null })),
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
    const descriptionValidator: ValidatorFn =
      control => (control.value ?? '').trim().replace(/\s+/g, ' ').length >= 100 ? null : { min: true };

    return fb.group({
      _id: [null, [Validators.required]],
      banners: [null],
      name: [null, [Validators.required]],
      grade: [null],
      year: [null],
      semester: [null],
      description: [null, [descriptionValidator]],
      isPublic: [true],
      projectType: ['교과목프로젝트'],
      subject: [null],
      ownProject: [null],
      ossList: [null],
      team: [null],
      documents: [null],
      repo: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IProject): Observable<boolean> {
    const observable: Observable<IResponse<IProject | undefined>> = this.modifying ?
      this.projectService.updateProject(this.model._id, m) : this.projectService.createProject(m);
    return observable.pipe(map(res => res.success));
  }
}
