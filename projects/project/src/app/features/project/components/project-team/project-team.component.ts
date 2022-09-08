import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo } from 'shared';
import { ProjectService } from '../../../../services';
import { IGithubAccount, IProjectTeam } from '../../../../types';

@Component({
  selector: 'sw-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

  teamName: string = null;
  @Input() projectId: string;
  @Input() editable = false;
  @Output() joinedMemberRemove: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() notJoinedMemberRemove: EventEmitter<number> = new EventEmitter();
  @Output() githubMemberRemove: EventEmitter<IGithubAccount> = new EventEmitter();

  private _team: IProjectTeam | null;

  constructor(
    private _projectService: ProjectService,
  ) {
  }

  @Input() set team(team: IProjectTeam | null) {
    this._team = team;
    this.teamName = this._team ? this._team.name : null;
  }

  get team(): IProjectTeam | null {
    return this._team;
  }

  get isEmpty(): boolean {
    return [
      ...(this._team?.member?.github || []),
      ...(this._team?.member?.joined || []),
      ...(this._team?.member?.notJoined || [])
    ].length === 0;
  }

  updateTeamName(): void {
    this._projectService.updateTeamName(this.projectId, this.teamName).subscribe({
      next: () => alert('팀명을 수정하였습니다.'),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  ngOnInit(): void {
  }
}
