import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IGithubAccount } from 'shared';
import { GithubService } from '../../../../services/github.service';
import { ProjectService } from '../../../../services/project.service';
import { IGithubProject } from '../../../../types/github-project';
import { IProjectRepository } from '../../../../types/project';
import { ISelectOption } from '../../../../types/select-option';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GithubRepoControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-github-repo-control',
  templateUrl: './github-repo-control.component.html',
  styleUrls: ['./github-repo-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class GithubRepoControlComponent implements ControlValueAccessor, OnInit {

  value: IProjectRepository;
  selectedAccount: IGithubAccount;
  accountOptions: ISelectOption<string>[] = [];
  githubRepos: IGithubProject[] = [];

  private onChange: any;
  private onTouch: any;

  constructor(private projectService: ProjectService,
              private githubService: GithubService) {
  }

  getGithubAccounts(): void {
    this.githubService.getMyGithubAccounts().subscribe(
      res => this.accountOptions = res.data.map(account => ({ viewValue: account.username, value: account._id }))
    );
  }

  changeAccount(accountId: string): void {
    if (accountId) {
      this.projectService.getGithubProjects(accountId).subscribe(
        res => this.githubRepos = res.data
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectRepository): void {
    this.value = value || null;
  }

  ngOnInit(): void {
  }
}
