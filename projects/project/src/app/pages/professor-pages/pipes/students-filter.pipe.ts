import { Pipe, PipeTransform } from '@angular/core';
import { StudentDto } from '../../../types';

@Pipe({
  name: 'studentsFilter'
})
export class StudentsFilterPipe implements PipeTransform {
  transform(students: StudentDto[], filterValue: string): StudentDto[] {
    if (filterValue === '전체') {
      return students;
    }

    return students.filter(student => {
      if (filterValue === '기타') {
        return !['1학년', '2학년', '3학년', '4학년'].includes(student.grade);
      }
      return student.grade === filterValue;
    });
  }
}
