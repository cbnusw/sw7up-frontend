import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-clean-page',
  templateUrl: './clean-page.component.html',
  styleUrls: ['./clean-page.component.scss']
})
export class CleanPageComponent implements OnInit {

  readonly CLEAN_URL = URLS.POLICY.CLEAN;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
