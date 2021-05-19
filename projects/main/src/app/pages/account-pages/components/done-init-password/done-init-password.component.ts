import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../../constants/urls';

@Component({
  selector: 'sw-done-init-password',
  templateUrl: './done-init-password.component.html',
  styleUrls: ['./done-init-password.component.scss']
})
export class DoneInitPasswordComponent implements OnInit {

  readonly LOGIN_URL = URLS.ACCOUNT.LOGIN;

  constructor() { }

  ngOnInit(): void {
  }

}
