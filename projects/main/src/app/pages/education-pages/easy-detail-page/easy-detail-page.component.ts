import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
// @ts-ignore
import EASY_COURSES from './easy-courses.json';

interface IContent {
  label?: string;
  content: string;
}

interface ICourse {
  week: number;
  contents: IContent[];
}

interface IDescription {
  question: string;
  answer: string;
  courses?: ICourse[];
}

interface IEasy {
  type: string;
  title: string;
  descriptions: IDescription[];
}

@Component({
  selector: 'sw-easy-detail-page',
  templateUrl: './easy-detail-page.component.html',
  styleUrls: ['./easy-detail-page.component.scss']
})
export class EasyDetailPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  easyCourse: IEasy;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private breadcrumb: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(map(params => +(params.index || 1) - 1)).subscribe(
      index => {
        this.easyCourse = EASY_COURSES[index];
        this.breadcrumb.items = ['SW교육', 'EASY 코스', this.easyCourse.title];
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.breadcrumb.clear();
  }

}
