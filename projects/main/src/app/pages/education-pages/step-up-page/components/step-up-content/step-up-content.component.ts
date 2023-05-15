import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IStepUpContent, StepUpService } from 'shared';
import { URLS } from '../../../../../constants/urls';

@Component({
  selector: 'sw-step-up-content',
  templateUrl: './step-up-content.component.html',
  styleUrls: ['./step-up-content.component.scss']
})
export class StepUpContentComponent implements OnInit, OnDestroy {
  readonly BASE_URL = URLS.EDUCATION.STEP_UP;

  subjects = '';
  content: IStepUpContent | null = null;
  showSolution = false;

  private readonly _subscription = new Subscription();

  constructor(private readonly _stepUpService: StepUpService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this._route.params.pipe(
        map(({ level, subject, content }) => [level, subject, content]),
        switchMap(([level, subject, content]) => {
          return (level && subject && content)
            ? forkJoin([
              this._stepUpService.getLevel(level).pipe(
                map(res => res.data),
              ),
              this._stepUpService.getSubjectSequence(subject).pipe(
                map(res => res.data)
              ),
              this._stepUpService.getContent(content).pipe(
                map(res => res.data)
              )
            ])
            : forkJoin([of(null), of([]), of(null)]);
        })
      ).subscribe(([level, subjects, content]) => {
        this.subjects = [level?.name, ...subjects.map(({ name }) => name)].join(' > ');
        this.content = content;
        if (!this.content) {
          this._router.navigateByUrl(URLS.EDUCATION.STEP_UP);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
