import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IStepUpSubject } from 'shared';
import { StepUpSubjectService } from '../../services/step-up-subject.service';

@Component({
  selector: 'sw-step-up-subject',
  templateUrl: './step-up-subject.component.html',
  styleUrls: [
    './step-up-subject.component.scss'
  ]
})
export class StepUpSubjectComponent implements OnInit {
  @Input() subject: IStepUpSubject;
  @Output() removeSubject: EventEmitter<void> = new EventEmitter<void>();

  children: IStepUpSubject[] = [];
  collapse = true;

  constructor(public readonly service: StepUpSubjectService) {
  }

  select(): void {
    this.service.selected = this.subject;
  }

  remove(): void {
    const yes = confirm(`${this.subject.name}을 삭제하시겠습니까? 삭제할 경우 하위 주제 및 콘텐츠가 모두 삭제됩니다.`);
    if (yes) {
      this.service.removeSubject(this.subject._id).subscribe(() => {
        if (this.subject._id === this.service.selected._id) {
          this.service.selected = null;
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
      this.service.updateSubjectName(this.subject._id, name).subscribe(() => this.subject.name = name);
    }
  }

  addSubSubject(): void {
    const name = (prompt(`"${this.subject.name}" 하위에 추가할 주제명을 입력하세요.`) || '').trim();
    const { level, _id } = this.subject;
    if (name) {
      this.service.createSubject(name, level, _id).pipe(
        switchMap(() => this.service.getSubjects(level, _id))
      ).subscribe({
        next: children => this.children = children
      });
    }
  }

  ngOnInit(): void {
    const { level, _id } = this.subject;
    this.service.getSubjects(level, _id).subscribe({
      next: children => {
        this.children = children;
      },
    });
  }
}
