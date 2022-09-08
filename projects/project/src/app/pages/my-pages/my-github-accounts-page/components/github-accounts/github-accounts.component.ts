import { Component, OnInit } from '@angular/core';
import { IGithubAccount } from 'projects/project/src/app/types';
import { GithubService } from '../../../../../services';

@Component({
  selector: 'sw-github-accounts',
  templateUrl: './github-accounts.component.html',
  styleUrls: ['./github-accounts.component.scss']
})
export class GithubAccountsComponent implements OnInit {

  constructor(
    public githubService: GithubService,
  ) { }

  ngOnInit(): void {
  }

  remove(account: IGithubAccount): void {
    const yes = confirm(`${account.username} 계정을 삭제하시겠습니까?\n깃헙 계정 삭제시 해당 계정과 관련된 프로젝트도 같이 삭제됩니다.`);
    if (yes) {
      this.githubService.removeAccount(account._id)
        .subscribe(() => alert('삭제하였습니다.'));
    }
  }
}
