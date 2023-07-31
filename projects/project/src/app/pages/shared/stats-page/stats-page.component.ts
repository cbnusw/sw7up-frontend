import { Component, OnInit } from '@angular/core';
import { ITabOption } from '../../../common/controls/components';
import { DepartmentData, ProjectTotal, SemesterBaseData } from '../../../services/stat.service';
import { RankingFiltersComponent } from '../components/ranking-filters/ranking-filters.component';
import { ProjectStatService, RankingService, RankingType } from '../services';

@Component({
  selector: 'sw-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {
  rankingTypeOptions: ITabOption<RankingType>[] = [
    {
      viewValue: '프로젝트 수',
      value: 'projects'
    },
    {
      viewValue: '파일 수',
      value: 'files'
    },
    {
      viewValue: '코드라인 수',
      value: 'codes'
    }
  ];

  rankingTypeOption = this.rankingTypeOptions[0];
  checkedDepartmentAverage = false;
  checkedGradeAverage = false;
  checkedGradeSeparateSemester = false;
  checkedPerformedAverage = false;
  checkedPerformedSeparateSemester = false;

  constructor(public readonly projectStatService: ProjectStatService,
              public readonly rankingService: RankingService) {
  }

  get projectTotal(): ProjectTotal {
    return this.projectStatService.projects.total;
  }

  get projectDepartments(): DepartmentData {
    return this.projectStatService.projects.departments;
  }

  get projectGrades(): SemesterBaseData {
    return this.projectStatService.projects.grades;
  }

  get projectPerformed(): SemesterBaseData {
    return this.projectStatService.projects.years;
  }

  get studentDepartments(): string[] {
    return Object.keys(this.projectDepartments.students);
  }

  changeRankingType(option: ITabOption<RankingType>, filters: RankingFiltersComponent): void {
    this.rankingTypeOption = option;
    filters.query.type = option.value;
    filters.search(false);
  }

  ngOnInit(): void {
  }
}
