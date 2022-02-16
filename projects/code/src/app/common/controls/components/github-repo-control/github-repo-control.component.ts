import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IGithubAccount } from 'shared';
import { GithubService } from '../../../../services/github.service';
import { ProjectService } from '../../../../services/project.service';
import { IProjectRepository, IProjectTeam } from '../../../../types/project';
import { TEntryList } from '../../../../types/project-file';
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

  @Output() teamChange: EventEmitter<IProjectTeam> = new EventEmitter<IProjectTeam>();
  @Output() cloningChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sourceChange: EventEmitter<TEntryList> = new EventEmitter<TEntryList>();
  @Input() projectId: string;

  value: IProjectRepository;
  selectMode = false;
  selectedAccount: IGithubAccount;
  accountOptions: ISelectOption<IGithubAccount>[] = [];
  githubRepos: IProjectRepository[] = [];
  loading = false;

  private onChange: any;
  private onTouch: any;

  constructor(private projectService: ProjectService,
              private githubService: GithubService) {
  }

  changeAccount(account: IGithubAccount): void {
    if (this.selectedAccount?._id === account._id) {
      return;
    }
    this.selectedAccount = account;
    if (account) {
      this.githubRepos = [];
      this.loading = true;
      this.projectService.getGithubProjects(account._id)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          res => this.githubRepos = res.data
        );
    }
  }

  selectlProject(project: IProjectRepository): void {
    const yes = confirm(`${project.name}로 등록하시겠습니까?`);
    if (!yes) {
      return;
    }
    this.value = project;
    const team: IProjectTeam = {
      name: null,
      member: {
        joined: [],
        notJoined: [],
        github: project.commitInfo.map(info => info.committer),
      }
    };
    this.change();
    this.teamChange.emit(team);
    this.selectMode = false;
    this.cloningChange.emit(false);
    this.projectService.clonePublicProject(this.projectId, project.url, this.selectedAccount._id)
      .pipe(finalize(() => this.cloningChange.emit(false)))
      .subscribe(
        res => this.sourceChange.emit(res.data)
      );
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
    this.githubService.getMyGithubAccounts().subscribe(
      res => this.accountOptions = res.data.map(account => ({ viewValue: account.username, value: account }))
    );
  }

  private change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
