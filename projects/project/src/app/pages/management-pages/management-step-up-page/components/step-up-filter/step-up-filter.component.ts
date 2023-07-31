import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAJORS } from 'shared';
import { FilterContainerComponent } from '../../../../../common/filter/components/filter-container/filter-container.component';
import { MemberFilter } from '../../../../../common/filter/components/member-filter/member-filter.component';
import { PerformedPeriodFilter } from '../../../../../common/filter/components/performed-filter/performed-filter.component';
import { ISelectOption } from '../../../../../types';
import { SearchStepUpQueryDto, StepUpManagementService } from '../../services/step-up-management.service';

@Component({
  selector: 'sw-step-up-filter',
  templateUrl: './step-up-filter.component.html',
  styleUrls: ['./step-up-filter.component.scss']
})
export class StepUpFilterComponent implements OnInit, OnDestroy {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;

  query: SearchStepUpQueryDto = {
    startPerformedAt: null,
    endPerformedAt: null,
    pass: null,
    level: null,
    departments: [...MAJORS, '기타'],
    name: null,
    no: null,
  };

  performedPeriodFilter: PerformedPeriodFilter = { start: null, end: null };
  passOptions: ISelectOption[] = [
    { viewValue: '전체', value: null },
    { viewValue: '합격', value: true },
    { viewValue: '불합격', value: false }
  ];
  levelOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  studentFilter: MemberFilter = { name: null, no: null };

  private readonly _subscription = new Subscription();

  constructor(private readonly _service: StepUpManagementService) {
  }

  changeStudentFilter(filter: MemberFilter): void {
    this.studentFilter = filter;
    const { name, no } = filter;
    this.query.name = name;
    this.query.no = no;
  }

  changePerformedPeriodFilter(filter: PerformedPeriodFilter): void {
    this.performedPeriodFilter = filter;
    const { start, end } = filter;
    this.query.startPerformedAt = start;
    this.query.endPerformedAt = end;
  }

  initQuery(): void {
    this.query.startPerformedAt = null;
    this.query.endPerformedAt = null;
    this.query.pass = null;
    this.query.level = null;
    this.query.departments = [...MAJORS, '기타'];
    this.query.name = null;
    this.query.no = null;
    this.search();
  }

  search(): void {
    this._service.search(this.query);
    this.container?.collapse();
  }

  ngOnInit(): void {
    this._convertParamsToQuery();
    this.search();
    this._subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _convertParamsToQuery(): void {
    this.query = { ...this.query, ...this._service.convertParamsToQuery() };
    this.studentFilter.name = this.query.name;
    this.studentFilter.no = this.query.no;
    this.performedPeriodFilter.start = this.query.startPerformedAt;
    this.performedPeriodFilter.end = this.query.endPerformedAt;
  }

  private _subscribe(): void {
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.levels$.subscribe(list => this.levelOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );
  }
}
