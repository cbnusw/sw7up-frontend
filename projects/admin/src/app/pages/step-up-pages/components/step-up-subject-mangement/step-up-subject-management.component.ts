import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IStepUpSubject } from 'shared';
import { StepUpLevelService } from '../../services/step-up-level.service';
import { StepUpSubjectService } from '../../services/step-up-subject.service';

@Component({
  selector: 'sw-step-up-subject-management',
  templateUrl: './step-up-subject-management.component.html',
  styleUrls: [
    './step-up-subject-management.component.scss'
  ]
})
export class StepUpSubjectManagementComponent implements OnInit, OnDestroy {
  @Output() changeContent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addContent: EventEmitter<void> = new EventEmitter<void>();
  subjects: IStepUpSubject[] = [];
  private readonly _subscription = new Subscription();

  constructor(private readonly _levelService: StepUpLevelService,
              private readonly _subjectService: StepUpSubjectService) {
  }

  addSubject(): void {
    const name = (prompt('추가할 주제명을 입력하세요.') || '').trim();
    if (name) {
      const level = this._levelService.selected._id;
      this._subjectService.createSubject(name, level, null).pipe(
        switchMap(() => this._subjectService.getSubjects(level))
      ).subscribe(subjects => this.subjects = subjects);
    }
  }

  remove(index: number): void {
    this.subjects.splice(index, 1);
  }

  ngOnInit(): void {
    this._subscription.add(
      this._levelService.selected$.pipe(
        map(level => level._id),
        switchMap(level => this._subjectService.getSubjects(level))
      ).subscribe(subjects => this.subjects = subjects)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
