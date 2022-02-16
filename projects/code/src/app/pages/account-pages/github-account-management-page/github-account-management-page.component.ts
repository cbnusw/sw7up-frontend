import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService, IGithubAccount, IUser } from 'shared';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'sw-github-account-management-page',
  templateUrl: './github-account-management-page.component.html',
  styleUrls: ['./github-account-management-page.component.scss']
})
export class GithubAccountManagementPageComponent implements OnInit {

  accounts: IGithubAccount[] = [];

  private subscription: Subscription;

  constructor(public auth: AuthService,
              private githubService: GithubService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.init().then(
      () => {
        this.subscription.add(
          this.githubService.accounts$.subscribe(accounts => this.accounts = accounts)
        );
      }
    );
  }

  private async init(): Promise<void> {
    const me: IUser = this.auth.me || await this.auth.me$.toPromise();
    if (me.role === 'student') {
      this.subscription = this.route.queryParams.pipe(
        map(params => params.code),
        // tap(code => console.log(code)),
        switchMap(code => code ?
          this.githubService.createGithubAccount(code).pipe(
            tap(() => this.router.navigateByUrl('/account/github')),
            map(res => res.data)
          ) : this.githubService.getMyGithubAccounts()
        )
      ).subscribe(
        () => {
        },
        err => alert(`계정 추가에 실패하였습니다.\n${err.error && err.error.message || err.message}`)
      );
    }
  }

}
