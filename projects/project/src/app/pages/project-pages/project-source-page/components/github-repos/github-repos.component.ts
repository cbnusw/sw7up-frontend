import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GithubRepoService, GithubService, ProjectService } from '../../../../../services';
import { IGithubAccount, IGithubRepo, ISelectOption } from '../../../../../types';


@Component({
  selector: 'sw-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss']
})
export class GithubReposComponent implements OnInit, OnDestroy {

  @Input() projectId: string;
  @Output() pendingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('repoContainerRef') repoContainerRef?: ElementRef;

  selectedAccount: IGithubAccount | null = null;
  githubAccountsOptions: ISelectOption[] = [];

  private _subscription: Subscription = new Subscription();

  @HostListener('wheel') handleScroll(): void {
    this._getMore();
  }

  @HostListener('touchmove') handleTouchmove(): void {
    this._getMore();
  }

  constructor(
    public githubService: GithubService,
    public githubRepoService: GithubRepoService,
    private _projectService: ProjectService,
  ) {
    this.githubRepoService.accountId = null;
  }

  addGithubAccount(): void {
    const yes = confirm('깃헙 사이트에서 타인의 계정으로 로그인이 되어 있다면 로그아웃후 진행해야 합니다.\n계정 연동을 진행하시겠습니까?');
    if (yes) {
      this.githubService.addGithubAccount();
    }
  }

  cloneRepository(repo: IGithubRepo): void {
    if (!this.projectId) {
      return;
    }

    const message = `깃헙 리파지토리 ${repo.name}의 소스코드를 복제하시겠습니까?\n이미 업로드된 소스코드가 있다면 해당 리파지토리의 소스코드로 대체됩니다.`;
    const yes = confirm(message);
    if (yes) {
      this.pendingChange.emit(true);
      this._projectService.cloneProject(this.projectId, this.selectedAccount._id, repo).pipe(
        finalize(() => this.pendingChange.emit(false))
      ).subscribe({
        error: err => alert(`Error::: ${err.error?.code || err.message}`),
      });
    }
  }

  selectAccount(account: IGithubAccount): void {
    this.selectedAccount = account;
    this.githubRepoService.accountId = account?._id || null;
  }

  ngOnInit(): void {
    this._subscription.add(
      this.githubService.accounts$.subscribe(accounts => {
        this.githubAccountsOptions = accounts.map(account => ({
          viewValue: account.username,
          value: account,
        }));
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _getMore(): void {
    if (this.repoContainerRef) {
      const top = this.repoContainerRef.nativeElement.scrollTop;
      const scrollHeight = this.repoContainerRef.nativeElement.scrollHeight;
      const offsetHeight = this.repoContainerRef.nativeElement.offsetHeight;
      if (top + offsetHeight >= scrollHeight) {
        this.githubRepoService.getMore();
      }
    }
  }
}
