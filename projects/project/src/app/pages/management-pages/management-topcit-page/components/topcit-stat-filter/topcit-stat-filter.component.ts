import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISelectOption } from '../../../../../types';
import { TopcitStatManagementService } from '../../services/topcit-stat-management.service';

@Component({
  selector: 'sw-topcit-stat-filter',
  templateUrl: './topcit-stat-filter.component.html',
  styleUrls: ['./topcit-stat-filter.component.scss'],
})
export class TopcitStatFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('filterHeader') filterHeader?: ElementRef;
  @ViewChild('filterBody') filterBody?: ElementRef;
  @HostBinding('style.height') height = 'auto';

  category: string = null;
  categoryOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  year: number = null;
  yearOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  no: number = null;
  noOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];

  private _collapsed = true;
  private readonly _subscription = new Subscription();

  constructor(private readonly _service: TopcitStatManagementService) {
  }

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(collased: boolean) {
    this._collapsed = collased;
    this._calculateHeight();
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
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.search();
    this._subscribe();
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

  ngAfterViewInit(): void {
    this._calculateHeight();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _calculateHeight(): void {
    setTimeout(() => {
      if (this.filterHeader && this.filterBody) {
        const height = this.filterHeader.nativeElement.clientHeight + (this.collapsed ? 0 : this.filterBody.nativeElement.clientHeight);
        this.height = height + 'px';
      } else {
        this.height = 'auto';
      }
    }, 0);
  }
}
