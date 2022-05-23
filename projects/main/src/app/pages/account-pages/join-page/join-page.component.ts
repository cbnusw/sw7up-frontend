import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AbstractFormDirective,
  AuthService,
  ERROR_CODES,
  IUser,
  MAJORS,
  UNIVERSITIES,
  OPTIONAL_EMAIL_PATTERN,
  OPTIONAL_MOBILE_NUM_PATTERN,
  PasswordValidator,
  TUserRole
} from 'shared';
import { URLS } from '../../../constants/urls';
import { PrivacyDialogComponent } from '../dialogs/privacy-dialog/privacy-dialog.component';

@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent extends AbstractFormDirective<IUser, boolean> {

  readonly LOGIN_URL = URLS.ACCOUNT.LOGIN;
  readonly MAJORS = [...MAJORS, '직접입력'];
  readonly UNIVERSITIES = UNIVERSITIES.slice(1);

  roles = [
    { value: 'student', viewValue: '충북대학생' },
    { value: 'other-student', viewValue: '타대학생' },
    { value: 'staff', viewValue: '충북대교직원' },
    { value: 'member', viewValue: '일반회원' },
  ];

  constructor(private auth: AuthService,
              private router: Router,
              private dialog: MatDialog,
              fb: FormBuilder) {
    super(fb);
  }

  get idLabel(): string {

    switch (this.roleValue) {
      case 'student':
        return '학번';
      case 'other-student':
        return '학번';
      case 'staff':
        return '교번';
      default:
        return '아이디';
    }
  }

  get idPlaceholder(): string {
    switch (this.roleValue) {
      case 'student':
        return '학번 10자리 입력, Ex. 2021123456';
      case 'other-student':
        return '학번 입력, Ex. 2021123456';
      case 'staff':
        return '교번 6자리 입력, Ex. 123456';
      default:
        return '5자 이상의 알파벳, 숫자, ., -, _ 조합';
    }
  }

  get roleValue(): TUserRole {
    return this.formGroup.get('role').value;
  }

  changeRole(role: TUserRole): boolean {
    this.reset()
    this.formGroup.get('role').setValue(role);
    return false;
  }

  openTerms(event: MouseEvent): boolean {
    event.preventDefault();

    this.dialog.open(PrivacyDialogComponent, {
      maxWidth: '1200px',
      height: '90vh',
      data: this.formGroup.get('agreement').value
    });
    return false;
  }

  isManual(): boolean {
    if (this.formGroup.getRawValue().info.department === '직접입력') {
      return true;
    }
  }

  async updateManualDepartment(): Promise<any> {
    const val = this.formGroup.getRawValue();
    if (val.info.department === '직접입력') {
      await this.formGroup.get('info.department').setValue(val.info.manualDepartment);
    }
  }

  async updateUniversity(): Promise<any> {
    const val = this.formGroup.getRawValue();
    if(val.role === 'student' || val.role === 'staff') await this.formGroup.get('info.university').setValue('충북대학교');
  }

  async updateOtherStudent(): Promise<any> {
    const val = this.formGroup.getRawValue();
    if(val.role === 'other-student') await this.formGroup.get('role').setValue('student');
  }

  protected async mapFormToModel(formGroup: FormGroup): Promise<IUser> {
    await this.updateManualDepartment();
    await this.updateOtherStudent();
    const rawValue = formGroup.getRawValue();
    rawValue.info.phone = rawValue.info.phone.replace(/[^\d]/g, '');
    rawValue.info.email = rawValue.info.email.toLowerCase();
    delete rawValue.agreement;
    return rawValue as IUser;
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert('회원 가입이 완료되었습니다. 로그인해주세요.');
    await this.router.navigateByUrl(URLS.ACCOUNT.LOGIN);
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    const { code } = e.error;
    switch (code) {
      case ERROR_CODES.REG_NUMBER_USED:
        const type = this.roleValue === 'member' ? '아이디' : '학번/교번';
        this.submissionError = { path: 'no', message: `이미 가입된 ${type}입니다.` };
        break;
      case ERROR_CODES.EMAIL_USED:
        this.submissionError = { path: ['info', 'email'], message: '이미 사용 중인 이메일입니다.' };
        break;
      case ERROR_CODES.PHONE_NUMBER_USED:
        this.submissionError = { path: ['info', 'phone'], message: '이미 사용 중인 휴대폰번호입니다.' };
        break;
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const formGroup = fb.group({
      no: [null, [Validators.required]],
      password: [null, [PasswordValidator.validate, Validators.min(8)]],
      confirmPassword: [null],
      role: ['student', [Validators.required]],
      info: fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.pattern(OPTIONAL_EMAIL_PATTERN)]],
        phone: [null, [Validators.required, Validators.pattern(OPTIONAL_MOBILE_NUM_PATTERN)]],
        department: [null],
        manualDepartment: [null],
        university: [null],
        position: [null],
      }),
      agreement: [false, [Validators.requiredTrue]],
    });

    formGroup.setValidators([
      PasswordValidator.confirmPassword(),
      // 충북대 소속이 아닌 사람의 경우 소속은 필수가 아님
      form => {
        const role = form.get('role').value;
        const department = form.get(['info', 'department']).value;
        if (role !== 'member' && !(department || '').trim()) {
          return { requiredDepartment: true };
        }
        return null;
      },
      form => {
        const role = form.get('role').value;
        const university = form.get(['info', 'university']).value;
        if (role !== 'member' && !(university || '').trim()) {
          return { requiredUniversity: true };
        }
        return null;
      },
      form => {
        const role = form.get('role').value;
        const department = form.get(['info', 'department']).value;
        const manualDepartment = form.get(['info', 'manualDepartment']).value;
        if (role !== 'member' && department === '직접입력' && (manualDepartment === null || manualDepartment === '')) {
            return { requiredManualDepartment: true };
        }
        return null;
      },
      form => {
        const no = form.get('no').value;
        switch (this.roleValue) {
          case 'student':
            // 충북대 학생의 경우 10자리 숫자
            return /^\d{10}$/.test(no) ? null : { invalidNo: true };
          case 'other-student':
            // 타대학 학생의 경우 숫자
            return /^\d+$/.test(no) ? null : { invalidNo: true };
          case 'staff':
            // 충북대 교직원의 경우 6자리 숫자
            return /^\d{6}$/.test(no) ? null : { invalidNo: true };
          case 'member':
            // 충북대 소속이 아닌 경우 숫자로만 아이디를 구성할 수 없음
            return !/^\d+$/.test(no) && /[a-zA-Z_\-.\d]{5,}/.test(no) ? null : { invalidId: true };
        }
      }
    ]);
    return formGroup;
  }

  async submit(): Promise<void> {
    await this.updateUniversity();
    return super.submit();
  }

  protected requestObservable(m: IUser): Observable<boolean> {
    return this.auth.join(m);
  }
}
