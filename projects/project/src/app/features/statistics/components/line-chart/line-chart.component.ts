import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

export interface SeriesItem {
  name: string;
  value: number;
}

export type LineChartSeries = SeriesItem[];

export interface LineChartItem {
  name: string;
  series: LineChartSeries;
}

export type LineChartData = LineChartItem[];

@Component({
  selector: 'sw-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {

  view: [number, number] | null = null;
  schemeType: ScaleType = ScaleType.Linear;
  @Input() data: LineChartData;
  @Input() @HostBinding('style.height') height = '300px';

  @HostListener('window:resize') handleResize(): void {
    this._resize();
  }

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
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
