import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AbstractFormDirective,
  AuthService,
  ERROR_CODES,
  IFindRegNo,
  OPTIONAL_EMAIL_PATTERN,
  OPTIONAL_MOBILE_NUM_PATTERN
} from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-find-account-page',
  templateUrl: './find-account-page.component.html',
  styleUrls: ['./find-account-page.component.scss']
})
export class FindAccountPageComponent extends AbstractFormDirective<IFindRegNo, string> {

  readonly LOGIN_URL = URLS.ACCOUNT.LOGIN;

  result: string;

  types = [
    { value: 'email', viewValue: '이메일로 찾기' },
    { value: 'phone', viewValue: '연락처로 찾기' },
  ];

  constructor(private auth: AuthService,
              fb: FormBuilder) {
    super(fb);
  }

  get typeValue(): string {
    return this.formGroup.get('type').value;
  }

  protected async processAfterSubmission(no: string): Promise<void> {
    this.result = no;
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    switch (e.error.code) {
      case ERROR_CODES.USER_INFO_NOT_FOUND:
        this.submissionError = { message: '찾을 수 없는 회원정보입니다.' };
        break;
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const formGroup = fb.group({
      type: ['email'],
      name: [null, [Validators.required]],
      email: [null, [Validators.pattern(OPTIONAL_EMAIL_PATTERN)]],
      phone: [null, [Validators.pattern(OPTIONAL_MOBILE_NUM_PATTERN)]],
    });

    formGroup.setValidators([
      form => {
        const email = form.get('email').value;
        const phone = form.get('phone').value;

        return !email && !phone ? { requiredEmailOrPhone: true } : null;
      }
    ]);

    return formGroup;
  }

  protected requestObservable(m: IFindRegNo): Observable<string> {
    return this.auth.findRegNo(m).pipe(map(res => res.data.no));
  }

  changeType(type: string): boolean {
    this.formGroup.reset();
    this.formGroup.get('type').setValue(type);
    return false;
  }
}
