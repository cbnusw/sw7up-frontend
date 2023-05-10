import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective, IResource, PlatformService, ResourceService, UploadService } from 'shared';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { UploadAdapter } from '../../../classes/upload-adaptor';

@Component({
  selector: 'sw-resource-form-page',
  templateUrl: './resource-form-page.component.html',
  styleUrls: ['./resource-form-page.component.scss']
})
export class ResourceFormPageComponent extends AbstractFormDirective<IResource, boolean> implements OnInit {

  editor: any = null;
  config = {
    language: 'ko',
    placeholder: '내용 작성',
  };

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(private resourceService: ResourceService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, false, platform);
    if (this.platform.isBrowser) {
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

  removeResource(): void {
    const yes = confirm('해당 글을 삭제하시겠습니까?');
    if (yes) {
      this.resourceService.removeResource(this.model._id).subscribe(
        () => {
          alert('글을 삭제하였습니다.');
          this.router.navigateByUrl('/resource/list');
        },
        err => alert(`글 삭제에 실패하였습니다.\n${err.message}`)
      );
    }
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert(`${this.modifying ? '수정' : '등록'}하였습니다.`);
    await this.router.navigateByUrl('/resource/list');
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    alert(`${this.modifying ? '수정' : '등록'}에 실패하였습니다.\n${e.message}`);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      attachments: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IResource): Observable<boolean> {
    const observable = this.modifying ? this.resourceService.updateResource(this.model._id, m) : this.resourceService.createResource(m);
    return observable.pipe(map(res => res.success));
  }


  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.resourceService.getResource(id))
      ).subscribe(
        res => this.model = res.data,
        err => {
          const message = err.status === 404 ? '찾을 수 없는 자료입니다.' : `${err.error ? err.error.message : err.message}`;
          alert(message);
          this.router.navigateByUrl('/resource/list');
        }
      )
    );
  }
}
