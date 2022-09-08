import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PROJECT_LIST_API_PATH, ProjectListService } from '../../../../../features/project';

@Component({
  selector: 'sw-none-source-projects',
  templateUrl: './none-source-projects.component.html',
  styleUrls: ['./none-source-projects.component.scss'],
  providers: [
    ProjectListService,
    { provide: PROJECT_LIST_API_PATH, useValue: '/none-source/me' },
  ],
})
export class NoneSourceProjectsComponent implements OnInit, OnDestroy {

  @HostBinding('class.hidden') hidden = true;
  @HostBinding('class.block') block = false;

  private _subscription = new Subscription();

  constructor(
    public projectListService: ProjectListService,
  ) {
  }

  ngOnInit(): void {
    this.projectListService.projects$.subscribe(projects => {
      this.hidden = projects.length === 0;
      this.block = projects.length > 0;
    });

    this.projectListService.search();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
