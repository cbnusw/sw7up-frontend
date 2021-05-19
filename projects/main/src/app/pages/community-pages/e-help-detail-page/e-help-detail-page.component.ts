import { Platform } from '@angular/cdk/platform';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AuthService, IQna, IResponse, PlatformService, QnaService } from 'shared';
import { URLS } from '../../../constants/urls';
import { PasswordDialogComponent } from '../dialog/password-dialog/password-dialog.component';

@Component({
  selector: 'sw-e-help-detail-page',
  templateUrl: './e-help-detail-page.component.html',
  styleUrls: ['./e-help-detail-page.component.scss']
})
export class EHelpDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  readonly E_HELP_URL = URLS.COMMUNITY.E_HELP;
  qna: IQna;
  content: string;

  constructor(public auth: AuthService,
              private platform: PlatformService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private qnaService: QnaService) {
  }

  writeReply(): void {
    if (this.platform.isBrowser) {
      let password;
      let observable;

      if (!this.auth.loggedIn) {
        observable = this.dialog.open(PasswordDialogComponent).afterClosed().pipe(
          tap(pass => password = pass),
          switchMap(() =>
            this.qnaService.addReply(this.qna._id, this.content, password).pipe(
              switchMap(() => this.getQnA(this.qna._id, password))
            )
          ),
        );
      } else {
        observable = this.qnaService.addReply(this.qna._id, this.content).pipe(
          switchMap(() => this.qnaService.getQnA(this.qna._id))
        );
      }

      observable.subscribe(
        res => {
          this.content = null;
          this.qna = res.data;
        },
        this.processError.bind(this)
      );
    }
  }

  getQnA(id: string, password?: string): Observable<IResponse<IQna>> {
    if (this.auth.loggedIn) {
      return this.qnaService.getQnA(id);
    }

    return this.qnaService.getQnA(id, password).pipe(
      catchError(err => {
        if (err.status === 403 && !this.auth.loggedIn) {
          return this.dialog.open(PasswordDialogComponent).afterClosed().pipe(
            switchMap(pass => this.qnaService.getQnA(id, pass))
          );
        }
        return throwError(err);
      }),
    );
  }

  removeQnA(): void {
    if (this.platform.isBrowser) {
      const yes = confirm('질문을 삭제하시겠습니까?');
      if (!yes) {
        return;
      }

      this.qnaService.removeQnA(this.qna._id).pipe(
        finalize(() => this.router.navigateByUrl(this.E_HELP_URL))
      ).subscribe(
        () => alert('질문을 삭제하였습니다.'),
        err => {
          const message = err.status === 403 ? '질문 삭제 권한이 없습니다.' : `${err.error && err.error.message || err.message}`;
          alert(message);
        },
      );
    }
  }

  confirmQnA(): void {
    if (this.platform.isBrowser) {
      const yes = confirm(`해당 질문을 ${this.qna.confirm ? '확인취소' : '확인처리'}하겠습니까?`);
      if (!yes) {
        return;
      }

      this.qnaService.confirm(this.qna._id, !this.qna.confirm).pipe(
        switchMap(() => this.qnaService.getQnA(this.qna._id))
      ).subscribe(
        res => {
          this.qna = res.data;
          alert(`해당 질문을 ${this.qna.confirm ? '확인 처리' : '확인 취소'}하였습니다.`);
        },
        err => alert(`${err.error && err.error.message || err.message}`)
      );
    }
  }

  private processError(err: HttpErrorResponse): void {
    if (this.platform.isBrowser) {
      let message;
      if (err.status === 403) {
        message = '이 질문은 열람할 수 없습니다.';
      } else if (err.status === 404) {
        message = '찾을 수 없는 질문입니다.';
      } else {
        message = `${err.error && err.error.message || err.message}`;
      }
      alert(message);
      this.router.navigateByUrl(this.E_HELP_URL);
    }
  }

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this._subscription = this.route.params.pipe(
        map(params => params.id),
        switchMap(id => this.getQnA(id))
      ).subscribe(
        res => this.qna = res.data,
        this.processError.bind(this)
      );
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
