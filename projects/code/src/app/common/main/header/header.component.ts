import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StorageService } from 'shared';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,
              private storage: StorageService,
              private router: Router) { }

  get loginUrl(): string {
    this.storage.redirectUrl = `${environment.host}${this.router.url}`;
    return environment.loginPageUrl;
  }
  ngOnInit(): void {
  }

}
