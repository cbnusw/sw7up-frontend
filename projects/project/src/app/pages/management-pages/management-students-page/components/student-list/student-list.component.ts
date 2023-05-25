import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StudentManagementService, StudentResponseDto } from '../../services/student-management.service';

@Component({
  selector: 'sw-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  pending = false;

  constructor(readonly service: StudentManagementService) {
  }

  removeStudent(document: StudentResponseDto): void {
    const yes = confirm(`${document.name} 학생을 삭제하시겠습니까?`);
    if (yes) {
      this.pending = true;
      this.service.removeStudent(document._id).pipe(
        finalize(() => this.pending = false)
      ).subscribe();
    }
  }
}
