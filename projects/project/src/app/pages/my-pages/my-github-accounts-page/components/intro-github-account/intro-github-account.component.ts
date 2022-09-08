import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'shared';
import { GithubService } from '../../../../../services';

@Component({
  selector: 'sw-intro-github-account',
  templateUrl: './intro-github-account.component.html',
  styleUrls: ['./intro-github-account.component.scss']
})
export class IntroGithubAccountComponent implements OnInit {

  constructor(
    public githubService: GithubService,
    private _router: Router,
    private _storage: StorageService,
  ) {
  }

  ngOnInit(): void {
  }
}
