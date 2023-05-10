import { Component } from '@angular/core';
import { IStepUpLevel } from 'shared';
import { StepUpLevelService } from '../../services/step-up-level.service';

@Component({
  selector: 'sw-step-up-level-management',
  templateUrl: './step-up-level-management.component.html',
  styleUrls: [
    './step-up-level-management.component.scss'
  ]
})
export class StepUpLevelManagementComponent {
  constructor(public readonly service: StepUpLevelService) {
  }

  select(level: IStepUpLevel): void {
    this.service.selected = level;
  }

  addLevel(): void {
    const name = (prompt('추가할 레벨명') || '').trim();
    if (name) {
      this.service.createStepUpLevel(name);
    }
  }

  editLevel(level: IStepUpLevel): void {
    const name = (prompt(`"${level.name}" 수정`, level.name) || '').trim();
    if (name) {
      this.service.updateStepUpLevel(level._id, name);
    }
  }

  removeLevel(level: IStepUpLevel): void {
    const yes = confirm(`"${level.name}" 레벨을 삭제하시겠습니까? 삭제할 경우 하위 주제 및 콘텐츠가 모두 삭제됩니다.`);
    if (yes) {
      this.service.removeStepUpLevel(level._id);
    }
  }
}
