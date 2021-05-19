import { Component, OnInit } from '@angular/core';
import { IOtpResponse } from '../components/otp-form/otp-form.component';

declare type TInitPasswordStep = 'otp' | 'init' | 'done';

@Component({
  selector: 'sw-init-password-page',
  templateUrl: './init-password-page.component.html',
  styleUrls: ['./init-password-page.component.scss']
})
export class InitPasswordPageComponent implements OnInit {

  no: string;
  code: string;
  step: TInitPasswordStep = 'otp';

  constructor() { }

  ngOnInit(): void {
  }

  setOtpResult({ no, code }: IOtpResponse): void {
    this.no = no;
    this.code = code;
    this.step = 'init';
  }
}
