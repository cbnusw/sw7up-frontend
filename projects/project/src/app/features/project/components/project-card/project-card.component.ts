import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'shared';
import { IPopupMenuItem } from '../../../../common/controls/components';
import { RedirectRouterService } from '../../../../services';
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
    }
  ];

  @Input() project: IProject;

  constructor(
    public auth: AuthService,
    private _redirectRouter: RedirectRouterService,
  ) {
  }

  ngOnInit(): void {
  }
}
