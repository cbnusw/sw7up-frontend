import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-project-count-card',
  templateUrl: './project-count-card.component.html',
  styleUrls: ['./project-count-card.component.scss']
})
export class ProjectCountCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() average: number;
}
