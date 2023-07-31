import { Component, OnInit, ViewChild } from '@angular/core';
import { MAJORS } from 'shared';
import { FilterContainerComponent } from '../../../../common/filter/components/filter-container/filter-container.component';
import { PerformedPeriodFilter } from '../../../../common/filter/components/performed-filter/performed-filter.component';
import { ProjectsQuery } from '../../../../services/stat.service';
import { ProjectStatService } from '../../services';

const DEFAULT_QUERY: ProjectsQuery = {
  startPerformedAt: null,
  endPerformedAt: null,
  department: [...MAJORS, '기타']
};

@Component({
  selector: 'sw-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss']
})
export class ProjectFiltersComponent implements OnInit {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;

  query: ProjectsQuery = { ...DEFAULT_QUERY };

  performedPeriodFilter: PerformedPeriodFilter = { start: null, end: null };

  constructor(private readonly _projectStatService: ProjectStatService) {
  }

  initQuery(): void {
    this.query = { ...DEFAULT_QUERY };
    this.performedPeriodFilter.start = null;
    this.performedPeriodFilter.end = null;
    this._projectStatService.search(this.query);
    this.container?.collapse();
  }

  search(): void {
    this._projectStatService.search(this.query);
    this.container?.collapse();
  }

  changePerformedPeriod(filter: PerformedPeriodFilter): void {
    const { start, end } = filter;
    this.performedPeriodFilter.start = start;
    this.performedPeriodFilter.end = end;
    this.query.startPerformedAt = start;
    this.query.endPerformedAt = end;
  }

  ngOnInit(): void {
    this._convertParamsToQuery();
    this.search();
  }

  private _convertParamsToQuery(): void {
    this.query = { ...this.query, ...this._projectStatService.convertParamsToQuery() };
    this.performedPeriodFilter.start = this.query.startPerformedAt;
    this.performedPeriodFilter.end = this.query.endPerformedAt;
  }
}
