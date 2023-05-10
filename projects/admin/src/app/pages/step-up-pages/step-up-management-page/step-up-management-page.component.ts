import { Component } from '@angular/core';
import { IStepUpContent } from 'shared';
import { StepUpContentService } from '../services/step-up-content.service';
import { StepUpLevelService } from '../services/step-up-level.service';

@Component({
  selector: 'sw-step-up-management-page',
  templateUrl: './step-up-management-page.component.html',
  styleUrls: [
    './step-up-management-page.component.scss'
  ]
})
export class StepUpManagementPageComponent {

  showForm = false;

  constructor(public readonly levelService: StepUpLevelService,
              public readonly contentService: StepUpContentService) {
  }

  openForm(content: IStepUpContent): void {
    this.contentService.selected = content;
    this.showForm = true;
  }

  closeForm(): void {
    this.contentService.selected = null;
    this.showForm = false;
  }
}
