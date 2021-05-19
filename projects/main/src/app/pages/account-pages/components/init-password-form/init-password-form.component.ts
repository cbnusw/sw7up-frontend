import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractFormDirective, AuthService, PasswordValidator } from 'shared';

interface IInitPassword {
  no: string;
  code: string;
  password: string;
}

@Component({
  selector: 'sw-init-password-form',
  templateUrl: './init-password-form.component.html',
  styleUrls: ['./init-password-form.component.scss']
})
export class InitPasswordFormComponent extends AbstractFormDirective<IInitPassword, boolean> {

  @Output() changeNext: EventEmitter<undefined> = new EventEmitter();

  constructor(private auth: AuthService,
              fb: FormBuilder) {
    super(fb);
  }

  @Input() set no(no: string) {
    this.formGroup.get('no').setValue(no);
  }

  @Input() set code(code: string) {
    this.formGroup.get('code').setValue(code);

  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    this.changeNext.emit();
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const formGroup = fb.group({
      no: [null],
      code: [null],
      password: [null, [PasswordValidator.validate]],
      confirmPassword: [null]
    });

    formGroup.setValidators([PasswordValidator.confirmPassword()]);
    return formGroup;
  }

  protected requestObservable(m: IInitPassword): Observable<boolean> {
    const { no, code, password } = m;
    return this.auth.initPassword(no, code, password).pipe(map(res => res.success));
  }

}
