import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IStepUpContent } from 'shared';
import { StepUpContentService } from '../../services/step-up-content.service';
import { StepUpSubjectService } from '../../services/step-up-subject.service';

@Component({
  selector: 'sw-step-up-content-list',
  templateUrl: './step-up-content-list.component.html',
  styleUrls: [
    './step-up-content-list.component.scss'
  ]
})
export class StepUpContentListComponent implements OnInit, OnDestroy {
  @Output() openForm: EventEmitter<IStepUpContent | null> = new EventEmitter<IStepUpContent | null>();

  subjects: string;
  contents: IStepUpContent[] = [];

  private readonly _subscription = new Subscription();

  constructor(public readonly subjectService: StepUpSubjectService,
              public readonly contentService: StepUpContentService) {
  }

  remove(content: IStepUpContent): void {
    const yes = confirm(`"${content.title}" 콘텐츠를 삭제하시겠습니까?`);
    if (yes) {
      this.contentService.removeContent(content._id).subscribe(() => this.contentService.update());
    }
  }

  ngOnInit(): void {
    this._subscription.add(
      this.subjectService.selected$.pipe(
        switchMap(subject => subject ? forkJoin([
          this.subjectService.getSubjectSequence(subject._id),
          this.contentService.getContents(subject._id)
        ]) : of([[], []])),
        map(([sequence, contents]) => [sequence.map(s => s.name).join(' > '), contents])
      ).subscribe(([sequence, contents]: [string, IStepUpContent[]]) => {
        this.subjects = sequence;
        this.contents = contents;
      })
    );

    this._subscription.add(
      this.contentService.update$.pipe(
        switchMap(() => {
          const { _id } = this.subjectService.selected || {};
          return _id ? this.contentService.getContents(_id) : of([]);
        })
      ).subscribe(contents => this.contents = contents)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
