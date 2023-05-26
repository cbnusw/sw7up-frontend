import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ITabOption } from '../../../../common/controls/components';
import { ProjectsDto, StatService, StudentProjectsDto } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';
import { ProjectsChartComponent } from '../projects-chart/projects-chart.component';

@Component({
  selector: 'sw-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChildren(ProjectsChartComponent) chartComponents: QueryList<ProjectsChartComponent>;
  @Input() student: StudentDto;
  studentProjects: StudentProjectsDto = null;
  averages: ProjectsDto = null;

  studentTotal: {
    projects: number;
    files: number;
    codes: number;
    comments: number;
    students: number;
  };

  total: {
    projects: number;
    files: number;
    codes: number;
    comments: number;
    students: number;
  };

  yearOptions: ITabOption[] = [];
  yearOption: ITabOption;

  constructor(private _statService: StatService) {
  }

  changeYearOption(option: ITabOption): void {
    if (this.yearOption === option) {
      return;
    }

    let startYear: number;
    let endYear: number;
    this.yearOption = option;
    startYear = endYear = this.yearOption.value;

    this._statService.getStudentProjects(this.student.no, { startYear, endYear }).pipe(
      tap(projects => this.studentProjects = projects),
      switchMap(projects => {
        if (!projects) {
          return of(null);
        }
        return this._statService.getProjects({ startYear, endYear });
      })
    ).subscribe(projects => {
      this.averages = this._convertAverage(projects);
      setTimeout(() => {
        this.chartComponents.forEach(component => component.updateChart());
      }, 0);
    });
  }

  ngOnInit(): void {
    let startYear: number;
    let endYear: number;

    this._statService.getStudentProjects(this.student.no).pipe(
      map(projects => projects ? projects.total : null)
    ).subscribe(total => {
      this.studentTotal = total;
    });

    this._statService.getProjects().pipe(
      map(projects => projects ? projects.total : null)
    ).subscribe(total => {
      this.total = total;
    });

    this._statService.getStudentProjectYears(this.student.no).pipe(
      tap(years => {
        this.yearOptions = years.map(year => ({ viewValue: `${year}년`, value: year }));
        this.yearOption = this.yearOptions[0];
        startYear = endYear = this.yearOption?.value || null;
      }),
      switchMap(years => {
        if (years.length === 0) {
          return of(null);
        }
        return this._statService.getStudentProjects(this.student.no, { startYear, endYear });
      }),
      tap(projects => this.studentProjects = projects),
      switchMap(projects => {
        if (!projects) {
          return of(null);
        }
        return this._statService.getProjects({ startYear, endYear });
      })
    ).subscribe(projects => {
      this.averages = this._convertAverage(projects);
    });
  }

  private _convertAverage(projects: ProjectsDto): ProjectsDto {
    if (!projects) {
      return null;
    }

    Object.keys(projects.departments).forEach(key1 => {
      if (key1 !== 'students') {
        Object.keys(projects.departments[key1]).forEach(key2 => {
          projects.departments[key1][key2] /= (projects.departments.students[key2] || 1);
        });
      }
    });

    Object.keys(projects.grades).forEach(key1 => {
      if (key1 !== 'students') {
        Object.keys(projects.grades[key1]).forEach(key2 => {
          projects.grades[key1][key2] /= (projects.grades.students[key2] || 1);
        });
      }
    });

    Object.keys(projects.total).forEach(key => {
      if (key !== 'students') {
        projects.total[key] /= (projects.total.students || 1);
      }
    });

    Object.keys(projects.years).forEach(key1 => {
      if (key1 !== 'students') {
        Object.keys(projects.years[key1]).forEach(key2 => {
          projects.years[key1][key2] /= (projects.years.students[key2] || 1);
        });
      }
    });
    return projects;
  }
}
