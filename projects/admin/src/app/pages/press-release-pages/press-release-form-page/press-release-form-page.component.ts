import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  AbstractFormDirective,
  IPressRelease,
  OPTIONAL_HTTP_URL_PATTERN,
  PlatformService,
  PressReleaseService,
  UploadService
} from 'shared';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { UploadAdapter } from '../../../classes/upload-adaptor';

@Component({
  selector: 'sw-press-release-form-page',
  templateUrl: './press-release-form-page.component.html',
  styleUrls: ['./press-release-form-page.component.scss']
})
export class PressReleaseFormPageComponent extends AbstractFormDirective<IPressRelease, boolean> implements OnInit {

  editor: any = null;
  config = {
    language: 'ko',
    placeholder: '보도자료 작성'
  };

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(private pressReleaseService: PressReleaseService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, null, platform);
    if (platform.isBrowser) {
      import('@ckeditor/ckeditor5-build-decoupled-document').then(editor => this.editor = editor.default);
    }
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

  removePressRelease(): void {
    const yes = confirm('해당 보도자료를 삭제하시겠습니까?');

    if (yes) {
      this.pressReleaseService.removePressRelease(this.model._id).subscribe(
        () => {
          alert('보도자료를 삭제하였습니다.');
          this.router.navigateByUrl('/press-release/list');
        },
        err => alert(`글 삭제에 실패하였습니다.\n${err.error && err.error.message || err.message}`)
      );
    }
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert(`${this.modifying ? '수정' : '등록'}하였습니다.`);
    await this.router.navigateByUrl('/press-release/list');
  }


  protected processSubmissionError(e: HttpErrorResponse): void {
    alert(`${this.modifying ? '수정' : '등록'}에 실패하였습니다.`);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      title: [null, [Validators.required]],
      link: [null, [Validators.required, Validators.pattern(OPTIONAL_HTTP_URL_PATTERN)]],
      content: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IPressRelease): Observable<boolean> {
    const observable =
      this.modifying ? this.pressReleaseService.updatePressRelease(this.model._id, m) : this.pressReleaseService.createPressRelease(m);
    return observable.pipe(map(res => res.success));
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.pressReleaseService.getPressRelease(id))
      ).subscribe(
        res => this.model = res.data,
        err => {
          if (this.platform.isBrowser) {
            const message = err.status === 404 ? '찾을 수 없는 보도자료입니다.' : err.error && err.error.message || err.message;
            alert(message);
            this.router.navigateByUrl('/press-release/list');
          }
        }
      )
    );
  }
}
