import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractFormDirective, AuthService, ERROR_CODES, PasswordValidator } from 'shared';

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'sw-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent extends AbstractFormDirective<IChangePassword, boolean> {

  done: boolean;

  constructor(private auth: AuthService,
              fb: FormBuilder) {
    super(fb);
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    this.done = true;
    this.reset();
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    const { code } = e.error || {};

    switch (code) {
      case ERROR_CODES.INVALID_PASSWORD:
        this.submissionError = { path: 'oldPassword', message: '잘못된 비밀번호입니다.' };
        return;
      default:
        console.error(e);
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const formGroup = fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, PasswordValidator.validate]],
      confirmPassword: [null]
    });

    formGroup.setValidators([
      PasswordValidator.confirmPassword('newPassword'),
      form => {
        const oldPass = form.get('oldPassword').value;
        const newPass = form.get('newPassword').value;
        return oldPass && oldPass === newPass ? { samePassword: true } : null;
      }
    ]);

    return formGroup;
  }

  protected requestObservable(m: IChangePassword): Observable<boolean> {
    const { oldPassword, newPassword } = m;
    return this.auth.changePassword(oldPassword, newPassword).pipe(map(res => res.success));
  }
}
