import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService, IGithubAccount, IUser } from 'shared';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'sw-public-project-management-page',
  templateUrl: './public-project-management-page.component.html',
  styleUrls: ['./public-project-management-page.component.scss']
})
export class PublicProjectManagementPageComponent implements OnInit, OnDestroy {

  accounts: IGithubAccount[] = [];
  private subscription: Subscription;

  constructor(public auth: AuthService,
              private githubService: GithubService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private async init(): Promise<void> {
    const me: IUser = this.auth.me || await this.auth.me$.toPromise();
    if (me.role === 'student') {
      this.subscription = this.route.queryParams.pipe(
        map(params => params.code),
        tap(code => console.log(code)),
        switchMap(code => code ?
          this.githubService.createGithubAccount(code).pipe(
            tap(() => this.router.navigateByUrl('/pm/public')),
            map(res => res.data)
          ) : this.githubService.getMyGithubAccounts()
        ),
        switchMap(() => this.githubService.accounts$)
      ).subscribe(
        accounts => {
          if (accounts.length === 0) {
            alert('등록된 GitHub 계정이 없습니다. 계정을 등록하세요.');
            this.router.navigateByUrl('/account/github');
          } else {
            this.accounts = accounts;
          }
        }
      );
    }
  }
}
