import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IStepUpContent, IStepUpSubject } from 'shared';
import { StepUpContentService } from '../../services/step-up-content.service';
import { StepUpSubjectService } from '../../services/step-up-subject.service';

@Component({
  selector: 'sw-step-up-subject',
  templateUrl: './step-up-subject.component.html',
  styleUrls: [
    './step-up-subject.component.scss'
  ]
})
export class StepUpSubjectComponent implements OnInit, OnDestroy {
  @Input() collapse = true;
  @Input() subject: IStepUpSubject;
  @Output() removeSubject: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeContent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addContent: EventEmitter<void> = new EventEmitter<void>();

  contents: IStepUpContent[] = [];
  children: IStepUpSubject[] = [];

  private readonly _subscription = new Subscription();

  constructor(public readonly subjectService: StepUpSubjectService,
              private readonly _contentService: StepUpContentService) {
  }

  select(): void {
    this.subjectService.selected = this.subject;
  }

  selectContent(content: IStepUpContent): void {
    this._contentService.selected = content;
    this.subjectService.selected = this.subject;
    this.changeContent.emit();
  }

  createContent(): void {
    this.subjectService.selected = this.subject;
    this._contentService.selected = null;
    this.changeContent.emit();
  }

  removeContent(index: number): void {
    const content = this.contents[index];
    const yes = confirm(`"${content.title}" 콘텐츠를 삭제하시겠습니까?`);
    if (yes) {
      this._contentService.removeContent(content._id).subscribe({
        next: () => this.contents.splice(index, 1),
      });
    }
  }

  remove(): void {
    const yes = confirm(`"${this.subject.name}" 주제를 삭제하시겠습니까?\n(주의) 삭제할 경우 하위 주제 및 콘텐츠가 모두 삭제됩니다.`);
    if (yes) {
      this.subjectService.removeSubject(this.subject._id).subscribe(() => {
        if (this.subject._id === this.subjectService.selected._id) {
          this.subjectService.selected = null;
        }
        this.removeSubject.emit();
      });
    }
  }

  removeChild(index: number): void {
    this.children.splice(index, 1);
  }

  edit(): void {
    const name = (prompt(`"${this.subject.name}" 수정`, this.subject.name) || '').trim();
    if (name) {
      this.subjectService.updateSubjectName(this.subject._id, name).subscribe(() => this.subject.name = name);
    }
  }

  addSubSubject(): void {
    const name = (prompt(`"${this.subject.name}" 하위에 추가할 주제명을 입력하세요.`) || '').trim();
    const { level, _id } = this.subject;
    if (name) {
      this.subjectService.createSubject(name, level, _id).pipe(
        switchMap(() => this.subjectService.getSubjects(level, _id))
      ).subscribe({
        next: children => this.children = children
      });
    }
  }

  ngOnInit(): void {
    const { level, _id } = this.subject;
    this.subjectService.getSubjects(level, _id).subscribe({
      next: children => {
        this.children = children;
      },
    });

    this._contentService.getContents(_id).subscribe({
      next: contents => this.contents = contents
    });

    this._subscription.add(
      this._contentService.update$.pipe(
        switchMap(() => this._contentService.getContents(_id))
      ).subscribe({
        next: contents => this.contents = contents
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
