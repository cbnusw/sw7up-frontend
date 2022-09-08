import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ScrollService } from '../../common/main/services';
import { PROJECT_LIST_API_PATH, ProjectListService } from '../../features/project';
import { CounterService } from '../../features/statistics/services';
import { ChartDataService, DashboardCounterService } from './services';

@Component({
  selector: 'sw-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [
    { provide: PROJECT_LIST_API_PATH, useValue: '' },
    ChartDataService,
    ProjectListService,
    { provide: CounterService, useClass: DashboardCounterService },
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  keywordControl: FormControl = new FormControl('');
  private _subscription = new Subscription();

  constructor(
    public projectListService: ProjectListService,
    private _scrollService: ScrollService,
    private _counterService: CounterService,
  ) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this._scrollService.scrollBottom$
        .pipe(filter(scrollBottom => scrollBottom))
        .subscribe(() => this.projectListService.getMore())
    );

    this._subscription.add(
      this.keywordControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(keyword => this.projectListService.keyword = keyword)
    );

    this.projectListService.search();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
