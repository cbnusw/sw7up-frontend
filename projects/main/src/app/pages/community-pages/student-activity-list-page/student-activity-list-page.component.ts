import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IParams } from 'projects/shared/src/public-api';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IStudentActivity, StudentActivityService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-student-activity-list-page',
  templateUrl: './student-activity-list-page.component.html',
  styleUrls: ['./student-activity-list-page.component.scss']
})
export class StudentActivityListPageComponent extends AbstractSearchDirective<IStudentActivity> {

  readonly STUDENT_ACTIVITY_URL = URLS.COMMUNITY.STUDENT_ACTIVITY;

  constructor(private studentActivityService: StudentActivityService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IStudentActivity>> {
    return this.studentActivityService.search(params);
  }
}
