import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {
  AbstractFormDirective,
  AuthService,
  ERROR_CODES,
  IUserInfo,
  MAJORS,
  OPTIONAL_EMAIL_PATTERN,
  OPTIONAL_MOBILE_NUM_PATTERN,
  TUserInfoCenter,
  UNIVERSITIES,
  USER_INFO_CENTERS,
} from 'shared';

@Component({
  selector: 'sw-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent
  extends AbstractFormDirective<IUserInfo, boolean>
  implements OnInit
{
  done: boolean = false;
  centers: TUserInfoCenter[] = USER_INFO_CENTERS;

  readonly MAJORS = [...MAJORS, '직접입력'];
  readonly UNIVERSITIES = UNIVERSITIES;

  roles = [
    { value: 'student', viewValue: '충북대학생' },
    { value: 'other-student', viewValue: '타대학생' },
    { value: 'staff', viewValue: '충북대교직원' },
    { value: 'member', viewValue: '일반회원' },
  ];

  constructor(public auth: AuthService, fb: FormBuilder) {
    super(fb, true);
  }

  get idLabel(): string {
    if (this.auth.isMember) {
      return '아이디';
    } else if (this.auth.isStudent) {
      return '학번';
    } else {
      return '교번';
    }
  }

  get idPlaceholder(): string {
    if (this.auth.isMember) {
      return '아이디 입력';
    } else if (this.auth.isStudent) {
      return '학번 입력';
    } else {
      return '교번 입력';
    }
  }

  get roleValue(): string {
    return this.formGroup?.get('role')?.value;
  }

  get universityValue(): string {
    return this.formGroup?.get('university')?.value;
  }

  isManual(): boolean {
    const departmentValue = this.formGroup?.get('department')?.value;
    return departmentValue === '직접입력';
  }

  handleUniversityChange(value: string): void {
    const departmentControl = this.formGroup.get('department');
    
    if (value === '충북대학교') {
      departmentControl?.setValue(''); // 충북대학교 선택 시 빈 문자열로 초기화
    } else {
      departmentControl?.setValue(''); // 다른 대학 선택 시에도 빈 문자열로 초기화
    }
  
    departmentControl?.updateValueAndValidity();
  }  

  checkManualDepartment(): void {
    const departmentValue = this.formGroup?.get('department')?.value;
  
    if (departmentValue === '직접입력') {
      this.formGroup.get('manualDepartment')?.setValidators([Validators.required]);
    } else {
      this.formGroup.get('manualDepartment')?.clearValidators();
      this.formGroup.get('manualDepartment')?.reset();
    }
    this.formGroup.get('manualDepartment')?.updateValueAndValidity();
  }
  
  
  protected async mapFormToModel(formGroup: FormGroup): Promise<IUserInfo> {
    const rawValue = formGroup.getRawValue();
    const department =
      rawValue.department === '직접입력'
        ? rawValue.manualDepartment
        : rawValue.department;
  
    return {
      no: rawValue.no,
      name: rawValue.name,
      email: rawValue.email,
      phone: rawValue.phone,
      center: rawValue.center,
      university: rawValue.university,
      department,
      position: rawValue.position,
      role: rawValue.role,
    };
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    this.done = true;
    this.auth.getMe();
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    const { code } = e.error || {};

    switch (code) {
      case ERROR_CODES.REG_NUMBER_USED:
        let message;
        if (this.auth.isMember) {
          message = '이미 사용 중인 아이디입니다.';
        } else if (this.auth.isStudent) {
          message = '이미 사용 중인 학번입니다.';
        } else {
          message = '이미 사용 중인 교번입니다.';
        }
        this.submissionError = { path: 'no', message };
        break;
      case ERROR_CODES.EMAIL_USED:
        this.submissionError = {
          path: 'email',
          message: '이미 사용 중인 이메일 주소입니다.',
        };
        break;
      case ERROR_CODES.PHONE_NUMBER_USED:
        this.submissionError = {
          path: 'phone',
          message: '이미 사용 중인 휴대폰 번호입니다.',
        };
        break;
      default:
        console.error(e);
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      no: [
        null,
        [
          Validators.required,
          (control) => {
            const no = control.value || '';
            if (this.auth.isMember) {
              return !/^\d+$/.test(no) && /[a-zA-Z_\-.\d]{5,}/.test(no)
                ? null
                : { invalidId: true };
            } else if (this.auth.isStudent) {
              return /^\d{10}$/.test(no) ? null : { invalidNo: true };
            } else if (this.auth.isStaff || this.auth.isOperator) {
              return /^\d{6}$/.test(no) ? null : { invalidNo: true };
            }
            return null;
          },
        ],
      ],
      name: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern(OPTIONAL_EMAIL_PATTERN)],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(OPTIONAL_MOBILE_NUM_PATTERN)],
      ],
      university: [null, [Validators.required]], // university는 최상위 필드
      department: [null, [Validators.required]], // department 기본 required
      manualDepartment: [null],
      center: [null],
      position: [null],
      role: ['student', [Validators.required]],
    });
  }

  protected requestObservable(m: IUserInfo): Observable<boolean> {
    return this.auth.updateMe(m).pipe(map((res) => res.success));
  }

  ngOnInit(): void {
    this.auth.me$
      .pipe(
        filter((me) => !!me),
        take(1)
      )
      .subscribe((me) => {
        this.formGroup = this.initFormGroup(this.fb);
        
        // 전체 정보를 한 번에 패치
        this.formGroup.patchValue({
          no: me.info?.no,
          name: me.info?.name,
          email: me.info?.email,
          phone: me.info?.phone,
          university: me.info?.university,
          role: me.info?.role || 'student',
          department: me.info?.department || '',
          center: me.info?.center,
          position: me.info?.position
        });
  
        // 충북대학교 학생의 경우 특별 처리
        if (me.info?.university === '충북대학교' && me.info?.role === 'student') {
          const department = me.info.department;
          if (department && !this.MAJORS.includes(department)) {
            this.formGroup.patchValue({
              department: '직접입력',
              manualDepartment: department
            });
          }
        }
        this.formGroup.get('university')?.valueChanges.subscribe((value) => {
          this.handleUniversityChange(value);
        });
        // 기존 구독 로직 유지
      });
  }
}

