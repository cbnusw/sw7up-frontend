import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'shared';
import { IPopupMenuItem } from '../../../../common/controls/components';
import { ProjectService, RedirectRouterService } from '../../../../services';
import { IProject } from '../../../../types';

@Component({
  selector: 'sw-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  popupItems: IPopupMenuItem[] = [
    {
      viewValue: () => '기본정보 수정',
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'basic']),
    },
    {
      viewValue: () => `소스파일 ${this.project?.source ? '수정' : '등록'}`,
      styleClass: () => `${!this.project?.source ? 'text-danger-500' : ''}`,
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'source']),
    },
    {
      viewValue: () => `슬라이드 ${this.project?.banners.length > 0 ? '수정' : '등록'}`,
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'slide'])
    },
    {
      viewValue: () => `팀 ${this.project?.team ? '수정' : '등록'}`,
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'team']),
    },
    {
      viewValue: () => `오픈소스 ${this.project?.ossList.length > 0 ? '수정' : '등록'}`,
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'oss']),
    },
    {
      viewValue: () => `프로젝트문서 ${this.project?.documents.length > 0 ? '수정' : '등록'}`,
      action: () => this._redirectRouter.navigate(['/projects', this.project?._id, 'documents']),
    },
    {
      viewValue: () => `프로젝트 삭제`,
      styleClass: () => 'text-danger-500',
      action: () => {
        const yes = confirm(`${this.project?.name} 프로젝트를 삭제하시겠습니까?`);
        if (yes) {
          this._projectService.removeProject(this.project._id).subscribe({
            next: () => this.projectRemove.emit(this.project),
            error: err => alert(`프로젝트 삭제에 실패하였습니다.\n${err?.error?.code || err?.message}`),
          });
        }
      },
    }
  ];

  @Input() project: IProject;
  @Output() projectRemove: EventEmitter<IProject> = new EventEmitter<IProject>();

  constructor(
    public auth: AuthService,
    private _redirectRouter: RedirectRouterService,
    private _projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
  }
}
