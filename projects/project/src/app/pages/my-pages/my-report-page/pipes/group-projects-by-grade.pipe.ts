import { Pipe, PipeTransform } from '@angular/core';
import { IProject } from '../../../../types';

@Pipe({
  name: 'groupProjectsByGrade'
})
export class GroupProjectsByGradePipe implements PipeTransform {
  transform(projects: IProject[], grade: number): any {
    return projects.filter(project => project.grade === grade).sort((p1, p2) => {
      if (p1.performedAt === p2.performedAt) {
        return p1.name < p2.name ? -1 : 1;
      }
      return p1.performedAt < p2.performedAt ? -1 : 1;
    });
  }
}
