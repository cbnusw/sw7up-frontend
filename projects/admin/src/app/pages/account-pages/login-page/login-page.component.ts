import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractFormDirective, AuthService, ERROR_CODES, IUser, StorageService } from 'shared';
import { ErrorMatcher } from '../../../classes/error-matcher';

@Component({
  selector: 'sw-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends AbstractFormDirective<IUser, boolean> {

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(private auth: AuthService,
              private storage: StorageService,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    const url = this.storage.redirectUrl || '';
    await this.router.navigateByUrl(url);
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    switch (e.error.code) {
      case ERROR_CODES.USER_NOT_FOUND:
        this.submissionError = { path: 'no', message: '등록되지 않은 교번입니다.' };
        break;
      case ERROR_CODES.INVALID_PASSWORD:
        this.submissionError = { path: 'password', message: '비밀번호가 틀렸습니다.' };
        break;
      case ERROR_CODES.FORBIDDEN:
        this.submissionError = { path: 'no', message: '권한이 없는 사용자입니다.' };
        break;
      default:
        console.log(e);
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      no: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IUser): Observable<boolean> {
    const { no, password } = m;
    return this.auth.loginOperator(no, password);
  }
}
