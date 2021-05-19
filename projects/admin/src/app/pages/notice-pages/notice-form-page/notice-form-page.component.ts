import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  AbstractFormDirective,
  INotice,
  NOTICE_ACCESS,
  NoticeService,
  PlatformService,
  TNoticeAccess,
  TNoticeCategory,
  UploadService
} from 'shared';
import { NOTICE_CATEGORIES } from '../../../../../../shared/src/lib/models/notice';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { UploadAdapter } from '../../../classes/upload-adaptor';

const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY년 M월',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY년 M월'
  }
};

@Component({
  selector: 'sw-notice-form-page',
  templateUrl: './notice-form-page.component.html',
  styleUrls: ['./notice-form-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMATS
    }
  ]
})
export class NoticeFormPageComponent extends AbstractFormDirective<INotice, boolean> implements OnInit {

  categories: TNoticeCategory[] = [...NOTICE_CATEGORIES];
  access: TNoticeAccess[] = [...NOTICE_ACCESS];

  // CKEditor
  editor: any = null;
  config = {
    language: 'ko',
    placeholder: '공지사항 작성',
  };

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  periodErrorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$, [{ errorCode: 'requiredPeriod' }]);

  constructor(private noticeService: NoticeService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, false, platform);
    if (platform.isBrowser) {
      import('@ckeditor/ckeditor5-build-decoupled-document').then(editor => this.editor = editor.default);
    }
  }

  get important(): boolean {
    return this.formGroup.get('important').value;
  }

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return new UploadAdapter(loader, this.uploadService);
    };

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  removeNotice(): void {
    const yes = confirm('해당 글을 삭제하시겠습니까?');
    if (yes) {
      this.noticeService.removeNotice(this.model._id).subscribe(
        () => {
          alert('글을 삭제하였습니다.');
          this.router.navigateByUrl('/notice/list');
        },
        err => alert(`글 삭제에 실패하였습니다.\n${err.message}`)
      );
    }
  }

  protected async mapFormToModel(formGroup: FormGroup): Promise<INotice> {
    const adjust = period => {
      period.setDate(model.period.getDate() + 1);
      period.setMinutes(model.period.getMinutes() - 1);
    };
    const model: INotice = this.formGroup.getRawValue();

    if (model.period) {
      model.period = new Date(model.period);

      if (!this.modifying || !this.model.period) {
        adjust(model.period);
      } else {
        const period = new Date(this.model.period);
        if (period.getTime() === model.period.getTime()) {
          console.log(period, model.period);
          adjust(model.period);
        }
      }
    }
    return model;
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert(`${this.modifying ? '수정' : '등록'}하였습니다.`);
    await this.router.navigateByUrl('/notice/list');
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    alert(`${this.modifying ? '수정' : '등록'}에 실패하였습니다.\n${e.message}`);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const formGroup = fb.group({
      category: [null, [Validators.required]],
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      attachments: [null],
      important: [false],
      period: [null],
      access: [[...NOTICE_ACCESS], [control => (control.value || []).length > 0 ? null : { emptyAccess: true }]],
    });

    formGroup.setValidators([
      form => {
        const important = form.get('important').value;
        const period = form.get('period').value;
        return important && !period ? { requiredPeriod: true } : null;
      }
    ]);

    return formGroup;
  }


  protected requestObservable(m: INotice): Observable<boolean> {
    const observable = this.modifying ? this.noticeService.updateNotice(this.model._id, m) : this.noticeService.createNotice(m);
    return observable.pipe(map(res => res.success));
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.noticeService.getNotice(id))
      ).subscribe(
        res => this.model = res.data,
        err => {
          const message = err.status === 404 ? '찾을 수 없는 공지사항입니다.' : `${err.error ? err.error.message : err.message}`;
          alert(message);
          this.router.navigateByUrl('/notice/list');
        }
      )
    );
  }
}
