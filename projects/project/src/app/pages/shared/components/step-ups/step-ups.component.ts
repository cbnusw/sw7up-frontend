import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatService, StudentStepUpDto } from '../../../../services/stat.service';
import { StudentDto, TPerformedSemester } from '../../../../types';
import { StepUpContentsDialogComponent } from '../step-up-content-dialog/step-up-contents-dialog.component';

@Component({
  selector: 'sw-step-ups',
  templateUrl: './step-ups.component.html',
  styleUrls: ['./step-ups.component.scss']
})
export class StepUpsComponent implements OnInit {
  @Input() student: StudentDto;
  stepUps: StudentStepUpDto[] = [];

  constructor(private readonly _statService: StatService,
              private readonly _dialog: MatDialog) {
  }

  get lastStepUp(): StudentStepUpDto | null {
    return this.stepUps.find(s => s.pass) || null;
  }

  year(performedAt: TPerformedSemester): string {
    return performedAt.split('-')[0] + '년';
  }

  semester(performedAt: TPerformedSemester): string {
    const s = performedAt.split('-')[1];
    switch (s) {
      case '0':
        return '1학기';
      case '1':
        return '여름학기';
      case '2':
        return '2학기';
      case '3':
        return '겨울학기';
      default:
        return '???';
    }
  }

  score(subjects: { name: string; score: number }[]): number {
    return subjects.reduce((acc, cur) => cur.score + acc, 0);
  }

  openDialog(tag: string): void {
    this._dialog.open(StepUpContentsDialogComponent, {
      data: tag,
    });
  }

  ngOnInit(): void {
    this._statService.getStudentStepUps(this.student.no)
      .subscribe(stepUps => this.stepUps = stepUps);
  }
}
