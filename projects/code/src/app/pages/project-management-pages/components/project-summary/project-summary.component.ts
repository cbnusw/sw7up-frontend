import { Component, Input, OnInit } from '@angular/core';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'shared';
import { IProjectMetaResponse, ProjectService, TProjectMetaName } from '../../../../services/project.service';
import { ISelectOption } from '../../../../types/select-option';

@Component({
  selector: 'sw-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {

  @Input() isPublic = false;

  readonly GRAPH_HEIGHT = 400;
  projects: number;
  files: number;
  codes: number;
  comments: number;
  filesByLanguage: IProjectMetaResponse[] = [];
  codesByLanguage: IProjectMetaResponse[] = [];
  commentsByLanguage: IProjectMetaResponse[] = [];
  graphData: any = {
    files: null,
    codes: null,
    comments: null,
  };
  graphKeys = Object.keys(this.graphData);
  config = {
    displayModeBar: false,
  };
  graphMeta: TProjectMetaName = null;
  graphOptions: ISelectOption<TProjectMetaName>[] = [
    { viewValue: '파일수', value: 'files' },
    { viewValue: '코드라인수', value: 'codes' },
    { viewValue: '주석수', value: 'comments' },
  ];

  constructor(private projectService: ProjectService,
              private auth: AuthService) {
  }

  setGraphMeta(name: TProjectMetaName): void {
    this.graphMeta = name;

    if (this.graphData[name]) {
      return;
    }

    this.auth.me$.pipe(
      filter(me => !!me),
      take(1),
      switchMap(me =>
        ['admin', 'operator'].indexOf(me.role) !== -1 ?
          this.projectService.countProjectMetaInfo(name, this.isPublic, true) :
          this.projectService.countMyProjectMetaInfo(name, this.isPublic, true)
      )
    ).subscribe(res => {
      this.graphData[name] = {
        data: (res.data as IProjectMetaResponse[])
          .sort((a, b) => a.language > b.language ? 1 : -1)
          .map(item => ({
            name: item.language,
            value: item.count,
          })),
        xLabel: '프로그래밍언어'
      };
    });
  }

  countProject(): void {
    this.auth.me$.pipe(
      filter(me => !!me),
      take(1),
      switchMap(me =>
        ['admin', 'operator'].indexOf(me.role) !== -1 ?
          this.projectService.countProjects({}, this.isPublic) :
          this.projectService.countMyProjects({}, this.isPublic)
      )
    ).subscribe(res => this.projects = res.data as number);
  }

  countMeta(meta: TProjectMetaName): void {
    this.auth.me$.pipe(
      filter(me => !!me),
      take(1),
      switchMap(me =>
        ['admin', 'operator'].indexOf(me.role) !== -1 ?
          this.projectService.countProjectMetaInfo(meta, this.isPublic) :
          this.projectService.countMyProjectMetaInfo(meta, this.isPublic)
      )
    ).subscribe(res => {
      const count: number = res.data as number;
      if (meta === 'files') {
        this.files = count;
      } else if (meta === 'codes') {
        this.codes = count;
      } else if (meta === 'comments') {
        this.comments = count;
      }
    });
  }

  ngOnInit(): void {
    this._init();
  }

  private _init(): void {
    this.setGraphMeta('files');
    this.countProject();
    this.countMeta('files');
    this.countMeta('codes');
    this.countMeta('comments');
  }
}
