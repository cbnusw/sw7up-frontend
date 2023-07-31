import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemberFilter } from '../../../../../common/filter/components/member-filter/member-filter.component';
import { FilterContainerComponent } from '../../../../../common/filter/components/filter-container/filter-container.component';
import { ISelectOption } from '../../../../../types';
import { SearchTopcitsQueryDto, TopcitManagementService } from '../../services/topcit-management.service';

@Component({
  selector: 'sw-topcit-filters',
  templateUrl: './topcit-filters.component.html',
  styleUrls: ['./topcit-filters.component.scss']
})
export class TopcitFiltersComponent implements OnInit, OnDestroy {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;

  query: SearchTopcitsQueryDto = {
    no: null,
    year: null,
    level: null,
    department: null,
    grade: null,
    studentNo: null,
    studentName: null,
  };

  yearOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  noOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  levelOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  departmentOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  gradeOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  creator: MemberFilter = { name: null, no: null };

  private readonly _subscription = new Subscription();

  constructor(private readonly _service: TopcitManagementService) {
  }

  changeCreator(creator: MemberFilter): void {
    this.creator = creator;
    const { name, no } = creator;
    this.query.studentName = name;
    this.query.studentNo = no;
  }

  initQuery(): void {
    this.query.year = null;
    this.query.no = null;
    this.query.level = null;
    this.query.department = null;
    this.query.grade = null;
    this.query.studentNo = null;
    this.query.studentName = null;

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
  }

  private _subscribe(): void {
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.years$.subscribe(list => this.yearOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ viewValue: `${value}년`, value }))
      ])
    );

    this._subscription.add(
      this._service.noList$.subscribe(list => this.noOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ viewValue: `${value}회`, value }))
      ])
    );

    this._subscription.add(
      this._service.levels$.subscribe(list => this.levelOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );

    this._subscription.add(
      this._service.departments$.subscribe(list => this.departmentOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );

    this._subscription.add(
      this._service.grades$.subscribe(list => this.gradeOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );
  }
}
