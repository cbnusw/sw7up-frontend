import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../services';
import { RedirectRouterService } from '../../../services';

@Component({
  selector: 'sw-register-github-account',
  templateUrl: './register-github-account.component.html',
  styleUrls: ['./register-github-account.component.scss']
})
export class RegisterGithubAccountComponent implements OnInit {

  constructor(
    private _accountService: GithubService,
    private _route: ActivatedRoute,
    private _redirectRouter: RedirectRouterService,
  ) {
  }

  ngOnInit(): void {
    const { code } = this._route.snapshot.queryParams;

    if (!code) {
      alert('인증 코드를 전송받지 못해 깃헙 계정 등록에 실패하였습니다.');
      this._redirectRouter.redirect();
    }

    this._accountService.createGithubAccount(code);
  }
}
