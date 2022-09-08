import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IUserInfo } from 'shared';
import { HeaderService } from '../../../common/main/services';
import { ProjectService, RedirectRouterService } from '../../../services';
import { IGithubAccount, INotJoinedMember, IProject, ISelectOption } from '../../../types';

@Component({
  selector: 'sw-project-team-page',
  templateUrl: './project-team-page.component.html',
  styleUrls: ['./project-team-page.component.scss']
})
export class ProjectTeamPageComponent implements OnInit {

  project: IProject;
  selectedOption = '사업단회원';
  teamOptions: ISelectOption[] = [
    { value: '사업단회원' },
    { value: '비회원' },
    { value: '깃헙' }
  ];

  private _subscription = new Subscription();

  constructor(
    public redirectRouter: RedirectRouterService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
  ) {
  }

  addJoinedMember(member: IUserInfo): void {
    if (!this.project.team?.member) {
      this.project.team = { ...this.project.team, member: { github: [], notJoined: [], joined: [] } };
    }

    if (this.project.team.member.joined.find(m => m._id === member._id)) {
      alert('이미 추가된 팀원입니다.');
      return;
    }

    this._projectService.addJoinedTeamMember(this.project._id, member._id).subscribe({
      next: () => this.project.team.member.joined.push(member),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`)
    });
  }

  removeJoinedMember(member: IUserInfo): void {
    this._projectService.removeJoinedTeamMember(this.project._id, member._id).subscribe({
      next: () => {
        const idx = this.project.team.member.joined.findIndex(m => m._id === member._id);
        if (idx !== -1) {
          this.project.team.member.joined.splice(idx, 1);
        }
      },
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  addGitHubMembers(): void {
    if (!this.project.team?.member) {
      this.project.team = { ...this.project.team, member: { github: [], notJoined: [], joined: [] } };
    }

    this._projectService.addGitHubMembers(this.project._id).subscribe({
      next: () => this.project.team.member.github = this.project.repo.commitInfo.map(info => info.committer),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  removeGitHubMember(member: IGithubAccount): void {
    this._projectService.removeGitHubMember(this.project._id, member._id).subscribe({
      next: () => {
        const idx = this.project.team.member.github.findIndex(m => m._id === member._id);
        if (idx !== -1) {
          this.project.team.member.github.splice(idx, 1);
        }
      },
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  addNotJoinedMember(member: INotJoinedMember): void {
    if (!this.project.team?.member) {
      this.project.team = { ...this.project.team, member: { github: [], notJoined: [], joined: [] } };
    }

    if (this.project.team.member.notJoined.find(m => m.school === member.school && m.no === member.no)) {
      alert('이미 추가된 팀원입니다.');
      return;
    }

    this._projectService.addNotJoinedMember(this.project._id, member).subscribe({
      next: () => this.project.team.member.notJoined.push(member),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  removeNotJoinedMember(index: number): void {
    this._projectService.removeNotJoinedMember(this.project._id, index).subscribe({
      next: () => this.project.team.member.notJoined.splice(index, 1),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  ngOnInit(): void {
    this._headerService.hidden = true;

    this._subscription.add(
      this._route.params.pipe(
        map(params => params.id),
        switchMap(id => this._projectService.getProject(id)),
        map(res => res.data)
      ).subscribe({
        next: project => this.project = project,
        error: err => {
          alert(`Error: ${err?.error?.code || err?.message}`);
          this.redirectRouter.redirect();
        },
      })
    );
  }
}
