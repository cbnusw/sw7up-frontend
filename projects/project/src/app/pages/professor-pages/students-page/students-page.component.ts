import { Component } from '@angular/core';
import { ISelectOption } from '../../../types';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'sw-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  gradeOptions = ['전체', '1학년', '2학년', '3학년', '4학년', '기타'];
  selectedGrade = this.gradeOptions[0];

  studentNo: string = null;
  studentName: string = null;
  studentOptions: ISelectOption[] = [
    { value: '이름' },
    { value: '학번' },
  ];
  studentOption = this.studentOptions[0].value;

  constructor(public service: StudentService) {
  }

  changeGradeOption(option: string): void {
    this.selectedGrade = option;
  }

  changeStudentOption(option: string): void {
    this.studentNo = this.studentName = null;
    this.studentOption = option;
  }
}
