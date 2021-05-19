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
  OPTIONAL_EMAIL_PATTERN,
  OPTIONAL_MOBILE_NUM_PATTERN,
  TUserInfoCenter,
  USER_INFO_CENTERS
} from 'shared';

@Component({
  selector: 'sw-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent extends AbstractFormDirective<IUserInfo, boolean> implements OnInit {

  done: boolean;
  centers: TUserInfoCenter[] = USER_INFO_CENTERS;

  constructor(public auth: AuthService,
              fb: FormBuilder) {
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
        this.submissionError = { path: 'email', message: '이미 사용 중인 이메일 주소입니다.' };
        break;
      case ERROR_CODES.PHONE_NUMBER_USED:
        this.submissionError = { path: 'phone', message: '이미 사용 중인 휴대폰 번호입니다.' };
        break;
      default:
        console.log(e);
    }
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      no: [
        null,
        [
          Validators.required,
          control => {
            const no = control.value || '';
            if (this.auth.isMember) {
              return !/^\d+$/.test(no) && /[a-zA-Z_\-.\d]{5,}/.test(no) ? null : { invalidId: true };
            } else if (this.auth.isStudent) {
              return /^\d{10}$/.test(no) ? null : { invalidNo: true };
            } else if (this.auth.isStaff || this.auth.isOperator) {
              return /^\d{6}$/.test(no) ? null : { invalidNo: true };
            }
            return null;
          }
        ]
      ],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(OPTIONAL_EMAIL_PATTERN)]],
      phone: [null, [Validators.required, Validators.pattern(OPTIONAL_MOBILE_NUM_PATTERN)]],
      center: [
        null,
        [
          control => this.auth.isOperator && !(control.value || '').trim() ? { required: true } : null
        ]
      ],
      department: [
        null,
        [
          control => !this.auth.isMember && !(control.value || '').trim() ? { required: true } : null
        ]
      ],
      position: [null],
    });
  }

  protected requestObservable(m: IUserInfo): Observable<boolean> {
    return this.auth.updateMe(m).pipe(map(res => res.success));
  }

  ngOnInit(): void {
    this.auth.me$.pipe(
      filter(me => !!me),
      take(1)
    ).subscribe(me => {
      this.formGroup = this.initFormGroup(this.fb);
      this.model = me.info;

      this.addSubscriptions(
        this.formGroup.valueChanges.subscribe(() => this.init()),
        this.model$.subscribe(model => {
          if (model) {
            this.patchForm(model);
          }
        })
      );
    });
  }
}
