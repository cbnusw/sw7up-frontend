import { Pipe, PipeTransform } from '@angular/core';
import { toRegex } from '../../../common/utils';
import { StudentDto } from '../../../types';

@Pipe({
  name: 'studentNameFilter'
})
export class StudentNameFilterPipe implements PipeTransform {
  transform(students: StudentDto[], filterValue: string | null): StudentDto[] {
    if (!(filterValue || '').trim()) {
      return students;
    }
    const pattern = toRegex(filterValue);
    return students.filter(student => pattern.test(student.name));
  }
}
