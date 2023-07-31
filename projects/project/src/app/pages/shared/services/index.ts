import { Provider } from '@angular/core';
import { ProjectStatService } from './project-stat.service';
import { RankingService } from './ranking.service';
import { StepUpService } from './step-up.service';
import { StudentProjectService } from './student-project.service';

export * from './project-stat.service';
export * from './ranking.service';

export const Services: Provider[] = [
  ProjectStatService,
  RankingService,
  StepUpService,
  StudentProjectService,
];
