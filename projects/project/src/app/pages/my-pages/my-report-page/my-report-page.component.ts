import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'shared';
import { ICount, StatisticsService } from '../../../services';
import { IProject } from '../../../types';

@Component({
  selector: 'sw-my-report-page',
  templateUrl: './my-report-page.component.html',
  styleUrls: ['./my-report-page.component.scss']
})
export class MyReportPageComponent implements OnInit {

  today = new Date();
  projectsCount: ICount;
  languages: [string, number, number, number][] = [];
  projectsByGrades: Array<IProject[]> = [];

  constructor(
    public auth: AuthService,
    private _statService: StatisticsService,
  ) {
  }

  print(): void {
    window.print();
  }

  ngOnInit(): void {
    this._statService.countMe().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => this.projectsCount = data,
      error: console.error
    });

    this._statService.getMyLanguages().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => {
        data.files.forEach(item => this.languages.push([item.name, item.value, 0, 0]));
        data.codes.forEach(item => {
          const finded = this.languages.find(lang => lang[0] === item.name);
          finded[2] = item.value;
        });
        data.comments.forEach(item => {
          const finded = this.languages.find(lang => lang[0] === item.name);
          finded[3] = item.value;
        });
        this.languages.sort((item1, item2) => item2[1] - item1[1]);
      },
      error: console.error,
    });

    this._statService.getMyProjectsByGrades().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => this.projectsByGrades = data,
      error: console.error,
    });
  }
}
