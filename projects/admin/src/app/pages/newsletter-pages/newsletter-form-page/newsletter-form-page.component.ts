import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractFormDirective, INewsletter, NewsletterService } from 'shared';
import { LayoutService } from 'ui';
import { ErrorMatcher } from '../../../classes/error-matcher';

@Component({
  selector: 'sw-newsletter-form-page',
  templateUrl: './newsletter-form-page.component.html',
  styleUrls: ['./newsletter-form-page.component.scss']
})
export class NewsletterFormPageComponent extends AbstractFormDirective<INewsletter, boolean> {

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(public layout: LayoutService,
              private newsletterService: NewsletterService,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }

  get file(): File {
    return this.formGroup.get('file').value;
  }

  selectFile(files: File[]): void {
    this.formGroup.get('file').setValue(files[0]);
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert('뉴스레터를 등록하였습니다.');
    await this.router.navigateByUrl('/newsletter/list');
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      title: [null, [Validators.required]],
      yearMonth: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      file: [null, [
        control => {
          if (!control.value) {
            return { required: true };
          } else if (!/\.zip$/.test(control.value.name)) {
            return { mimetype: true };
          }
          return null;
        }
      ]]
    });
  }

  protected requestObservable(m: INewsletter): Observable<boolean> {
    return this.newsletterService.createNewsletter(m).pipe(map(res => res.success));
  }
}
