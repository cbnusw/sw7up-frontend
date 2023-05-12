import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStepUpContent, IStepUpSubject, StepUpService } from 'shared';
import { URLS } from '../../../../../constants/urls';

@Component({
  selector: 'sw-step-up-subject',
  templateUrl: './step-up-subject.component.html',
  styleUrls: ['./step-up-subject.component.scss']
})
export class StepUpSubjectComponent implements OnInit {
  @Input() subject: IStepUpSubject;

  collapse = true;

  children$: Observable<IStepUpSubject[]> = of([]);
  contents$: Observable<IStepUpContent[]> = of([]);

  readonly BASE_URL = URLS.EDUCATION.STEP_UP;

  constructor(private readonly _stepUpService: StepUpService) {
  }

  ngOnInit(): void {
    this.children$ = this._stepUpService.getSubjects(this.subject.level, this.subject._id).pipe(map(res => res.data));
    this.contents$ = this._stepUpService.getContents(this.subject._id).pipe(map(res => res.data));
  }
}
