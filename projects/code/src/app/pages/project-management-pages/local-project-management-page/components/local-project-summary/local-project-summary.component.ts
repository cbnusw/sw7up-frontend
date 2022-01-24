import { Component, OnInit } from '@angular/core';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'shared';
import { IProjectMetaResponse, ProjectService, TProjectMetaName } from '../../../../../services/project.service';
import { ISelectOption } from '../../../../../types/select-option';

@Component({
  selector: 'sw-local-project-summary',
  templateUrl: './local-project-summary.component.html',
  styleUrls: ['./local-project-summary.component.scss']
})
export class LocalProjectSummaryComponent implements OnInit {

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
          this.projectService.countProjectMetaInfo(name, false, true) :
          this.projectService.countMyProjectMetaInfo(name, false, true)
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
          this.projectService.countProjects({}, false) :
          this.projectService.countMyProjects({}, false)
      )
    ).subscribe(res => this.projects = res.data as number);
  }

  countMeta(meta: TProjectMetaName): void {
    this.auth.me$.pipe(
      filter(me => !!me),
      take(1),
      switchMap(me =>
        ['admin', 'operator'].indexOf(me.role) !== -1 ?
          this.projectService.countProjectMetaInfo(meta, false) :
          this.projectService.countMyProjectMetaInfo(meta, false)
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
    // const me = await this.auth.me$.pipe(
    //   filter(m => !!m),
    //   take(1)
    // ).toPromise();

    this.setGraphMeta('files');
    this.countProject();
    this.countMeta('files');
    this.countMeta('codes');
    this.countMeta('comments');

    // this.projects = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjects({}, false)
    //     .pipe(map(res => res.data as number)).toPromise() :
    //   await this.projectService.countMyProjects({}, false)
    //     .pipe(map(res => res.data as number)).toPromise();
    //
    // this.files = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('files', false)
    //     .pipe(map(res => res.data as number)).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('files', false)
    //     .pipe(map(res => res.data as number)).toPromise();
    //
    // this.codes = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('codes', false)
    //     .pipe(map(res => res.data as number)).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('codes', false)
    //     .pipe(map(res => res.data as number)).toPromise();
    //
    // this.comments = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('comments', false)
    //     .pipe(map(res => res.data as number)).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('comments', false)
    //     .pipe(map(res => res.data as number)).toPromise();
    // this.filesByLanguage = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('files', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('files', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise();
    //
    // this.codesByLanguage = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('codes', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('codes', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise();
    //
    // this.commentsByLanguage = ['admin', 'operator'].indexOf(me.role) !== -1 ?
    //   await this.projectService.countProjectMetaInfo('comments', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise() :
    //   await this.projectService.countMyProjectMetaInfo('comments', false, true)
    //     .pipe(map(res => res.data as IProjectMetaResponse[])).toPromise();

    // this.graphData.push(
    //   {
    //     data: this.filesByLanguage.map(item => ({
    //       name: item.language,
    //       value: item.count,
    //     })),
    //     xLabel: '언어',
    //     yLabel: '파일수'
    //   },
    //   {
    //     data: this.codesByLanguage.map(item => ({
    //       name: item.language,
    //       value: item.count,
    //     })),
    //     xLabel: '언어',
    //     yLabel: '코드라인수'
    //   },
    //   {
    //     data: this.commentsByLanguage.map(item => ({
    //       name: item.language,
    //       value: item.count,
    //     })),
    //     xLabel: '언어',
    //     yLabel: '주석수'
    //   },
    // );
    // this.graphIndex = 0;
    // console.log(this.graphIndex);
  }
}
