import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IGithubAccount } from 'shared';
import { GithubService } from '../../../../../services/github.service';

@Component({
  selector: 'sw-github-account-list',
  templateUrl: './github-account-list.component.html',
  styleUrls: ['./github-account-list.component.scss']
})
export class GithubAccountListComponent implements OnInit {

  @Input() accounts: IGithubAccount[] = [];
  loadingId: string = null;

  constructor(private githubService: GithubService) {
  }

  removeGitHubAccount(account: IGithubAccount): void {
    const yes = confirm(`${account.username} 계정을 삭제하시겠습니까?`);
    if (!yes) {
      return;
    }

    this.loadingId = account._id;

    this.githubService.removeGithubAccount(account._id).pipe(
      finalize(() => this.loadingId = null)
    ).subscribe(
      () => alert(`${account.username} 계정을 삭제하였습니다.`)
    );
  }

  ngOnInit(): void {
  }
}
