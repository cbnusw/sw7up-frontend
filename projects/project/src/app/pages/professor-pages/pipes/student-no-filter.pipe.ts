import { Pipe, PipeTransform } from '@angular/core';
import { toRegex } from '../../../common/utils/to-regex';
import { StudentDto } from '../services/student.service';

@Pipe({
  name: 'studentNoFilter'
})
export class StudentNoFilterPipe implements PipeTransform {
  transform(students: StudentDto[], filterValue: string | null): StudentDto[] {
    if (!(filterValue || '').trim()) {
      return students;
    }
    const pattern = toRegex(filterValue);
    return students.filter(student => pattern.test(student.no));
  }
}
