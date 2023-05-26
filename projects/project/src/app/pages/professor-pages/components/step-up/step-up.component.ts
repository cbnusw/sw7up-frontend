import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StatService, StudentStepUpDto } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';

@Component({
  selector: 'sw-step-up',
  templateUrl: './step-up.component.html',
  styleUrls: ['./step-up.component.scss']
})
export class StepUpComponent implements OnInit {
  @Input() student: StudentDto;
  stepUp: StudentStepUpDto | null;

  constructor(private _statService: StatService) {
  }

  ngOnInit(): void {
    this._statService.getStudentStepUps(this.student.no).pipe(
      map(data => data[0] || null)
    ).subscribe(stepUp => this.stepUp = stepUp);
  }
}
