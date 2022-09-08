import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ScrollService } from '../../../../../common/main/services';
import { PROJECT_LIST_API_PATH, ProjectListService } from '../../../../../features/project';

@Component({
  selector: 'sw-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
  providers: [
    ProjectListService,
    { provide: PROJECT_LIST_API_PATH, useValue: '/me' },
  ]
})
export class MyProjectsComponent implements OnInit, OnDestroy {

  keywordControl: FormControl = new FormControl('');

  private _subscription = new Subscription();

  constructor(
    private _projectListService: ProjectListService,
    private _scrollService: ScrollService,
  ) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this._scrollService.scrollBottom$
        .pipe(filter(scrollBottom => scrollBottom))
        .subscribe(() => this._projectListService.getMore())
    );

    this._subscription.add(
      this.keywordControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(keyword => this._projectListService.keyword = keyword)
    );

    this._projectListService.search();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
