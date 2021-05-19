import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IQna, QnaService } from 'shared';

@Component({
  selector: 'sw-qna-detail-page',
  templateUrl: './qna-detail-page.component.html',
  styleUrls: ['./qna-detail-page.component.scss']
})
export class QnaDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  qna: IQna;
  content: string;

  constructor(private qnaService: QnaService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  writeReply(): void {
    this.qnaService.addReply(this.qna._id, this.content).pipe(
      switchMap(() => this.qnaService.getQnA(this.qna._id))
    ).subscribe(
      res => {
        this.qna = res.data;
        this.content = null;
      },
      err => alert(`${err.error && err.error.message || err.message}`)
    );
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.qnaService.getQnA(id))
    ).subscribe(
      res => this.qna = res.data,
      err => {
        const message = err.status === 404 ? '찾을 수 없는 질문입니다.' : `${err.error && err.error.message || err.message}`;
        alert(message);
        this.router.navigateByUrl('/e-help/list');
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
