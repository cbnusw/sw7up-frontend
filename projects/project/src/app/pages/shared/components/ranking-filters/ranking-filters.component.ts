import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterContainerComponent } from '../../../../common/filter/components/filter-container/filter-container.component';
import { PerformedPeriodFilter } from '../../../../common/filter/components/performed-filter/performed-filter.component';
import { PeriodFilter } from '../../../../common/filter/components/period-filter/period-filter.component';
import { DEFAULT_RANKING_QEURY, RankingQueryDto, RankingService } from '../../services';

@Component({
  selector: 'sw-ranking-filters',
  templateUrl: './ranking-filters.component.html',
  styleUrls: ['./ranking-filters.component.scss']
})
export class RankingFiltersComponent implements OnInit {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;

  query: RankingQueryDto = { ...DEFAULT_RANKING_QEURY };
  filters = {
    performedPeriodFilter: { start: null, end: null },
    createdPeriodFilter: { start: null, end: null },
    limitOptions: [
      { viewValue: '상위 5위까지', value: 5 },
      { viewValue: '상위 10위까지', value: 10 },
      { viewValue: '상위 20위까지', value: 20 },
      { viewValue: '상위 30위까지', value: 30 },
      { viewValue: '상위 50위까지', value: 50 },
    ],
  };

  constructor(private readonly _rankingService: RankingService) {
  }

  initQuery(): void {
    this.query = { ...DEFAULT_RANKING_QEURY };
    this.filters.performedPeriodFilter.start = null;
    this.filters.performedPeriodFilter.end = null;
    this._rankingService.search(this.query);
    this.container?.collapse();
  }

  search(collapse = true): void {
    this._rankingService.search(this.query);
    if (collapse) {
      this.container?.collapse();
    }
  }

  changePerformedPeriod(filter: PerformedPeriodFilter): void {
    const { start, end } = filter;
    this.filters.performedPeriodFilter = filter;
    this.query.startPerformedAt = start;
    this.query.endPerformedAt = end;
  }

  changeCreatedPeriod(filter: PeriodFilter): void {
    const { start, end } = filter;
    this.filters.createdPeriodFilter = filter;
    this.query.startCreatedAt = start;
    this.query.endCreatedAt = end;
  }

  ngOnInit(): void {
    this._convertParamsToQuery();
    this.search();
  }

  private _convertParamsToQuery(): void {
    this.query = { ...this.query, ...this._rankingService.convertParamsToQuery() };

    this.filters.performedPeriodFilter.start = this.query.startPerformedAt;
    this.filters.performedPeriodFilter.end = this.query.endPerformedAt;
    this.filters.createdPeriodFilter.start = this.query.startCreatedAt;
    this.filters.createdPeriodFilter.end = this.query.endCreatedAt;
  }
}
