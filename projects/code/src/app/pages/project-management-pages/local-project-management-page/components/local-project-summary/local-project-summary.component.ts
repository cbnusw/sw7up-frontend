import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'shared';
import { ProjectService } from '../../../../../services/project.service';

@Component({
  selector: 'sw-local-project-summary',
  templateUrl: './local-project-summary.component.html',
  styleUrls: ['./local-project-summary.component.scss']
})
export class LocalProjectSummaryComponent implements OnInit {

  projects: number;
  files: number;
  codes: number;
  filesByLanguage: any;
  codesByLanguage: any;
  graphData: any = [];
  config = {
    displayModeBar: false,
  };

  constructor(private projectService: ProjectService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init(): Promise<void> {
    const me = await this.auth.me$.pipe(
      filter(m => !!m),
      take(1)
    ).toPromise();

    this.projects = ['admin', 'operator'].indexOf(me.role) !== -1 ?
      await this.projectService.countLocalProjects().pipe(map(res => res.data)).toPromise() :
      await this.projectService.countMyLocalProjects().pipe(map(res => res.data)).toPromise();

    this.files = ['admin', 'operator'].indexOf(me.role) !== -1 ?
      await this.projectService.countLocalProjectFiles().pipe(map(res => res.data)).toPromise() :
      await this.projectService.countMyLocalProjectFiles().pipe(map(res => res.data)).toPromise();

    this.codes = ['admin', 'operator'].indexOf(me.role) !== -1 ?
      await this.projectService.countLocalProjectCodes().pipe(map(res => res.data)).toPromise() :
      await this.projectService.countMyLocalProjectCodes().pipe(map(res => res.data)).toPromise();

    this.filesByLanguage = ['admin', 'operator'].indexOf(me.role) !== -1 ?
      await this.projectService.countLocalProjectFilesByLanguages().pipe(map(res => res.data)).toPromise() :
      await this.projectService.countMyLocalProjectFilesByLanguages().pipe(map(res => res.data)).toPromise();

    this.codesByLanguage = ['admin', 'operator'].indexOf(me.role) !== -1 ?
      await this.projectService.countLocalProjectCodesByLanguages().pipe(map(res => res.data)).toPromise() :
      await this.projectService.countMyLocalProjectCodesByLanguages().pipe(map(res => res.data)).toPromise();

    this.graphData.push(
      {
        data: [
          { x: this.filesByLanguage.map(item => item.language), y: this.filesByLanguage.map(item => item.files), type: 'bar' }
        ]
      },
      {
        data: [
          { x: this.codesByLanguage.map(item => item.language), y: this.codesByLanguage.map(item => item.codes), type: 'bar' }
        ]
      }
    );
  }
}
