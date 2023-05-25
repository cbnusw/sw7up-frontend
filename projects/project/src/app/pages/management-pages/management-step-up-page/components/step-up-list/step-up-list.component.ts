import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StepUpManagementService, StepUpResponseDto } from '../../services/step-up-management.service';

@Component({
  selector: 'sw-step-up-list',
  templateUrl: './step-up-list.component.html',
  styleUrls: ['./step-up-list.component.scss']
})
export class StepUpListComponent {
  pending = false;

  constructor(public service: StepUpManagementService) {
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
