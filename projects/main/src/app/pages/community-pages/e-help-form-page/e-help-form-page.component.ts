import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  AbstractFormDirective,
  AuthService,
  E_HELP_CATEGORIES,
  IQna,
  OPTIONAL_EMAIL_PATTERN, PasswordValidator,
  PlatformService,
  QnaService,
  TEHelpCategory
} from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-e-help-form-page',
  templateUrl: './e-help-form-page.component.html',
  styleUrls: ['./e-help-form-page.component.scss']
})
export class EHelpFormPageComponent extends AbstractFormDirective<IQna, boolean> implements OnInit {

  readonly E_HELP_URL = URLS.COMMUNITY.E_HELP;
  categoryOptions: TEHelpCategory[] = E_HELP_CATEGORIES;

  constructor(public auth: AuthService,
              private qnaService: QnaService,
              private route: ActivatedRoute,
              private router: Router,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, false, platform);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    const required = control =>
      this.auth && !this.auth.loggedIn ? (control.value ? null : { required: true }) : null;

    return fb.group({
      category: [null, [Validators.required]],
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      password: [null, [required]],
      writerInfo: fb.group({
        department: [null, [required]],
        name: [null, [required]],
        email: [null, [required, Validators.pattern(OPTIONAL_EMAIL_PATTERN)]]
      }),
    });
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert('질문을 등록하였습니다.');
    await this.router.navigateByUrl(this.E_HELP_URL);
  }

  protected requestObservable(m: IQna): Observable<boolean> {
    const observable = this.modifying ? this.qnaService.updateQnA(this.model._id, m) : this.qnaService.createQnA(m);
    return observable.pipe(map(res => res.success));
  }


  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.qnaService.getQnA(id))
      ).subscribe(
        res => this.model = res.data,
        err => {
          let message;
          if (err.status === 403) {
            message = '권한이 없는 질문입니다.';
          } else if (err.status === 404) {
            message = '찾을 수 없는 질문입니다.';
          } else {
            message = `${err.error && err.error.message || err.message}`;
          }
          alert(message);
          this.router.navigateByUrl(this.E_HELP_URL);
        }
      )
    );
  }
}
