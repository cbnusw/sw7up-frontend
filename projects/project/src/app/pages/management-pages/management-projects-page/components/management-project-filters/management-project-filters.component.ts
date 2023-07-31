import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { MAJORS } from 'shared';
import { MemberFilter } from '../../../../../common/filter/components/member-filter/member-filter.component';
import { FilterContainerComponent } from '../../../../../common/filter/components/filter-container/filter-container.component';
import { PerformedPeriodFilter } from '../../../../../common/filter/components/performed-filter/performed-filter.component';
import { PeriodFilter } from '../../../../../common/filter/components/period-filter/period-filter.component';
import { ProjectTypeFilter } from '../../../../../common/filter/components/project-type-filter/project-type-filter.component';
import { ProjectManagementQuery, ProjectManagementService } from '../../services/project-management.service';

@Component({
  selector: 'sw-management-project-filters',
  templateUrl: './management-project-filters.component.html',
  styleUrls: ['./management-project-filters.component.scss']
})
export class ManagementProjectFiltersComponent implements OnInit {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;
  query: ProjectManagementQuery = {
    startCreatedAt: null,
    endCreatedAt: null,
    grade: null,
    startPerformedAt: null,
    endPerformedAt: null,
    creatorName: null,
    creatorNo: null,
    school: null,
    departments: [...MAJORS, '기타'],
    projectType: null,
    subjectName: null,
    ownProjectType: null,
    professor: null,
  };

  createdPeriod: PeriodFilter = { start: null, end: null };
  performedPeriod: PerformedPeriodFilter = { start: null, end: null };
  student: MemberFilter = { name: null, no: null };
  projectType: ProjectTypeFilter = {
    projectType: null,
    subjectName: null,
    ownProjectType: null,
  };

  constructor(
    public readonly service: ProjectManagementService
  ) {
  }

  changeCreatedPeriod(period: PeriodFilter): void {
    this.createdPeriod = period;
    const { start, end } = period;
    this.query.startCreatedAt = start;
    this.query.endCreatedAt = end;
  }

  changePerformedPeriod(period: PerformedPeriodFilter): void {
    this.performedPeriod = period;
    const { start, end } = period;
    this.query.startPerformedAt = start;
    this.query.endPerformedAt = end;
  }

  changeStudent(student: MemberFilter): void {
    this.student = student;
    const { name, no } = student;
    this.query.creatorName = name;
    this.query.creatorNo = no;
  }

  changeProjectType(type: ProjectTypeFilter): void {
    this.projectType = type;
    const { projectType, subjectName, ownProjectType } = type;
    this.query.projectType = projectType;
    this.query.subjectName = subjectName;
    this.query.ownProjectType = ownProjectType;
  }

  search(): void {
    try {
      this.service.search(this.query);
      this.service.pending$.pipe(
        filter(pending => pending === false),
        take(1)
      ).subscribe(() => this.container?.collapse());
    } catch (e) {
      alert(e.message);
    }
  }

  initQuery(): void {
    this.query.startCreatedAt = null;
    this.query.endCreatedAt = null;
    this.query.grade = null;
    this.query.startPerformedAt = null;
    this.query.endPerformedAt = null;
    this.query.creatorName = null;
    this.query.creatorNo = null;
    this.query.school = null;
    this.query.departments = [...MAJORS, '기타'];
    this.query.subjectName = null;
    this.query.ownProjectType = null;
    this.query.professor = null;
    this.search();
  }

  ngOnInit(): void {
    this._convertParamsToQuery();
    if (this.service.total === 0) {
      this.search();
    }
  }

  private _convertParamsToQuery(): void {
    this.query = { ...this.query, ...this.service.convertParamsToQuery() };

    this.createdPeriod.start = this.query.startCreatedAt;
    this.createdPeriod.end = this.query.endCreatedAt;
    this.performedPeriod.start = this.query.startPerformedAt;
    this.performedPeriod.end = this.query.endPerformedAt;
    this.projectType.projectType = this.query.projectType;
    this.projectType.subjectName = this.query.subjectName;
    this.projectType.ownProjectType = this.query.ownProjectType;
    this.student.name = this.query.creatorName;
    this.student.no = this.query.creatorNo;
  }
}
