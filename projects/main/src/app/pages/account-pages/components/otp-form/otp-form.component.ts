import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AbstractFormDirective, AuthService, ERROR_CODES, OPTIONAL_EMAIL_PATTERN } from 'shared';

interface ICheckOtp {
  no: string;
  email: string;
  code: string;
}

export interface IOtpResponse {
  no: string;
  code: string;
}

@Component({
  selector: 'sw-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent extends AbstractFormDirective<ICheckOtp, boolean> implements OnDestroy {

  private static readonly LIMIT = 3 * 60;

  timerSubscription: Subscription;
  timer: string;
  otpLoading: boolean;
  disableOtpButton: boolean;

  @Output() changeNext: EventEmitter<IOtpResponse> = new EventEmitter();

  constructor(private auth: AuthService,
              fb: FormBuilder) {
    super(fb);
  }

  get otpButtonLabel(): string {
    if (this.otpLoading) {
      return '인증번호 전송 중';
    } else if (this.disableOtpButton) {
      return '인증번호 전송 완료';
    } else if (this.timerSubscription) {
      return '인증번호 재요청';
    } else {
      return '인증번호 요청';
    }
  }

  async requestOtp(): Promise<void> {
    this.submitted = true;
    this.unsubscribeTimer();

    if (this.formGroup.get('no').invalid || this.formGroup.get('email').invalid) {
      return;
    }

    const { no, email } = await this.mapFormToModel(this.formGroup);

    this.otpLoading = true;
    this.otpDisable();

    this.auth.sendOtp(no, email).pipe(
      finalize(() => this.otpLoading = false),
    ).subscribe(
      res => this.startTimer(),
      err => {
        this.otpEnable();
        this.unsubscribeTimer();
        this.processSubmissionError(err);
      }
    );
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    const { code } = e.error;
    switch (code) {
      case ERROR_CODES.USER_INFO_NOT_FOUND:
        this.submissionError = { message: '위 정보로 등록된 회원이 존재하지 않습니다.', code };
        break;
      case ERROR_CODES.INVALID_OTP:
        this.submissionError = { path: 'code', message: '잘못된 인증번호입니다.', code };
        break;
    }
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    const { no, code } = this.formGroup.getRawValue();
    this.changeNext.emit({ no, code });
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      no: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(OPTIONAL_EMAIL_PATTERN)]],
      code: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  protected requestObservable(m: ICheckOtp): Observable<boolean> {
    const { no, code } = m;
    return this.auth.checkOtp(no, code).pipe(map(res => res.success));
  }

  private otpEnable(): void {
    this.disableOtpButton = false;
    this.formGroup.get('no').enable();
    this.formGroup.get('email').enable();
  }

  private otpDisable(): void {
    this.disableOtpButton = true;
    this.formGroup.get('no').disable();
    this.formGroup.get('email').disable();
  }

  private unsubscribeTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
      this.timer = null;
    }
  }

  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(
      sec => {
        if (sec >= 10 && sec < OtpFormComponent.LIMIT) {
          this.otpEnable();
        } else if (sec >= OtpFormComponent.LIMIT) {
          this.unsubscribeTimer();
        }

        const rest = OtpFormComponent.LIMIT - sec;
        const m = Math.floor(rest / 60);
        const s = rest % 60;
        this.timer = (m > 0 ? `${m}분 ` : '') + (s > 0 ? `${s}초` : '');
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribeTimer();
  }
}
