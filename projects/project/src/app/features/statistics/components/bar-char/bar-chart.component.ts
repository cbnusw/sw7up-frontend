import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

export interface BarChartItem {
  name: string;
  value: number;
}

export type BarChartData = BarChartItem[];

@Component({
  selector: 'sw-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit {

  view: [number, number] | null = null;
  @Input() data: BarChartData;
  @Input() @HostBinding('style.height') height = '300px';

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  @HostListener('window:resize') handleResize(): void {
    this._resize();
  }

  ngAfterViewInit(): void {
    this._resize();
  }

  private _resize(): void {
    this.view = null;
    if (this.elementRef) {
      setTimeout(() => {
        this.view = [this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight];
      });
    }
  }
}
