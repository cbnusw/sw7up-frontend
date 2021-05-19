import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractFormDirective, AuthService, ERROR_CODES, IUser, StorageService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends AbstractFormDirective<IUser, boolean> {

  readonly JOIN_URL = URLS.ACCOUNT.JOIN;
  readonly FIND_ACCOUNT_URL = URLS.ACCOUNT.FIND;
  readonly INIT_PASSWORD_URL = URLS.ACCOUNT.PASSWORD;

  constructor(private auth: AuthService,
              private storage: StorageService,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    const redirectUrl = this.storage.redirectUrl;
    (redirectUrl || '/').startsWith('/') ? await this.router.navigateByUrl(redirectUrl) : location.href = redirectUrl;
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    switch (e.error.code) {
      case ERROR_CODES.USER_NOT_FOUND:
        this.submissionError = { path: 'no', message: '등록되지 않은 학번/교번 또는 아이디입니다.' };
        break;
      case ERROR_CODES.INVALID_PASSWORD:
        this.submissionError = { path: 'password', message: '잘못된 비밀번호입니다.' };
        break;
      default:
        console.error(e);
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
    return this.auth.login(no, password);
  }
}
