import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { GithubService, IGithubAccount } from 'shared';

@Component({
  selector: 'sw-my-project-list-page',
  templateUrl: './my-project-list-page.component.html',
  styleUrls: ['./my-project-list-page.component.scss']
})
export class MyProjectListPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  account: IGithubAccount;

  constructor(private githubService: GithubService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  loginGithub(): void {
    this.githubService.getGithubKey().subscribe(
      res => {
        const { clientId } = res.data;
        location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
      }
    );
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.pipe(
      map(params => params.code),
      switchMap(code => {
        if (code) {
          return this.githubService.createGithubAccount(code).pipe(tap(() => this.router.navigateByUrl('/project/me')));
        } else {
          return this.githubService.getMyGithubAccount();
        }
      }),
    ).subscribe(
      res => this.account = res.data,
      err => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
