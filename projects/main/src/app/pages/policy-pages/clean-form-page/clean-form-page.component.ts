import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractFormDirective, CorruptionReportService, ICorruptionReport } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-clean-form-page',
  templateUrl: './clean-form-page.component.html',
  styleUrls: ['./clean-form-page.component.scss']
})
export class CleanFormPageComponent extends AbstractFormDirective<ICorruptionReport, boolean> {

  readonly CLEAN_URL = URLS.POLICY.CLEAN;

  constructor(private corruptionReportService: CorruptionReportService,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }


  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert('등록을 완료하였습니다.');
    await this.router.navigate([this.CLEAN_URL, 'list']);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    });
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    alert(`등록에 실패하였습니다.\n${e.error ? e.error.message : e.message}`);
  }

  protected requestObservable(m: ICorruptionReport): Observable<boolean> {
    return this.corruptionReportService.createCorruptionReport(m).pipe(map(res => res.success));
  }
}
