import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SEMESTERS, TPerformedSemester, TSemester } from '../../../../../types';
import { StepUpManagementService, StepUpResponseDto, StepUpSubject } from '../../services/step-up-management.service';

@Component({
  selector: 'sw-step-up-list',
  templateUrl: './step-up-list.component.html',
  styleUrls: ['./step-up-list.component.scss']
})
export class StepUpListComponent {
  pending = false;

  constructor(public service: StepUpManagementService) {
  }

  year(performedAt: TPerformedSemester): string {
    return performedAt.split('-')[0] + '년';
  }

  semester(performedAt: TPerformedSemester): TSemester {
    return SEMESTERS[+performedAt.split('-')[1]];
  }

  score(subjects: StepUpSubject[]): number {
    console.log(subjects);
    return subjects.reduce((acc, cur) => acc + cur.score, 0);
  }

  subjects(subjects: StepUpSubject[]): string {
    return subjects.map(subject => `${subject.name}(${subject.score > 0 ? 'O' : 'X'})`).join(', ');
  }

  removeStepUp(document: StepUpResponseDto): void {
    const yes = confirm(`${document.name}의 STEP-Up 데이터를 삭제하시겠습니까?`);
    if (yes) {
      this.pending = true;
      this.service.removeStepUp(document._id).pipe(
        finalize(() => this.pending = false)
      ).subscribe();
    }
  }
}
