import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() average: number = null;
  @Input() align = 'right';

  get showAverage(): boolean {
    return this.average !== null && this.average !== undefined;
  }
}
