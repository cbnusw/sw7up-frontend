import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StudentDto } from '../../../professor-pages/services/student.service';

@Component({
  selector: 'sw-student-stats',
  templateUrl: './student-stats.component.html',
  styleUrls: ['./student-stats.component.scss']
})
export class StudentStatsComponent implements OnInit, OnDestroy {
  @Input() student: StudentDto;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
