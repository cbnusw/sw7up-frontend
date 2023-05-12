import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IStepUpLevel, IStepUpSubject, StepUpService } from 'shared';

@Component({
  selector: 'sw-step-up-page',
  templateUrl: './step-up-page.component.html',
  styleUrls: ['./step-up-page.component.scss']
})
export class StepUpPageComponent implements OnInit, OnDestroy {
  selected: IStepUpLevel;
  levels$: Observable<IStepUpLevel[]>;
  subjects$: Observable<IStepUpSubject[]> = of([]);
  showContent = false;

  private readonly _subscription = new Subscription();

  constructor(private readonly _stepUpService: StepUpService,
              private readonly _route: ActivatedRoute) {
    this.levels$ = this._stepUpService.getLevels().pipe(
      map(res => res.data),
      tap(levels => this.selectLevel(levels[0]))
    );
  }

  selectLevel(level: IStepUpLevel): void {
    this.selected = level;
    if (this.selected) {
      this.subjects$ = this._stepUpService.getSubjects(this.selected._id).pipe(map(res => res.data));
    }
  }

  ngOnInit(): void {
    this._subscription.add(
      this._route.params.subscribe(({level, subject, content}) => this.showContent = level && subject && content)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
