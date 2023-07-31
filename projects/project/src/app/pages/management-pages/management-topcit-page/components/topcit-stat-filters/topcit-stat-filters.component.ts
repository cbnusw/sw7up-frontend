import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterContainerComponent } from '../../../../../common/filter/components/filter-container/filter-container.component';
import { ISelectOption } from '../../../../../types';
import { TopcitStatManagementService } from '../../services/topcit-stat-management.service';

@Component({
  selector: 'sw-topcit-stat-filters',
  templateUrl: './topcit-stat-filters.component.html',
  styleUrls: ['./topcit-stat-filters.component.scss'],
})
export class TopcitStatFiltersComponent implements OnInit, OnDestroy {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;
  @HostBinding('style.height') height = 'auto';

  category: string = null;
  categoryOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  year: number = null;
  yearOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  no: number = null;
  noOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];

  private readonly _subscription = new Subscription();

  constructor(private readonly _service: TopcitStatManagementService) {
  }

  initQuery(): void {
    this.category = null;
    this.year = null;
    this.no = null;
    this.search();
  }

  search(): void {
    this._service.search({
      category: this.category,
      year: this.year,
      no: this.no,
    });
    this.container?.collapse();
  }

  ngOnInit(): void {
    this.search();
    this._subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _subscribe(): void {
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.categories$.subscribe(list => this.categoryOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );

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
  }
}
