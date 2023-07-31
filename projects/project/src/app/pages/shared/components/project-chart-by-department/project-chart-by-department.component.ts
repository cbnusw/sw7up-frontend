import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';

@Component({
  selector: 'sw-project-chart-by-department',
  templateUrl: './project-chart-by-department.component.html',
  styleUrls: ['./project-chart-by-department.component.scss']
})
export class ProjectChartByDepartmentComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() title: string;

  chart: Chart;
  chartConfig: ChartConfiguration;

  private _data: { [key in string]: number; } = {};
  private _studentData: { [key in string]: number; } = {};
  private _viewAverage = false;

  constructor(private _chartColorService: ChartColorService) {
  }

  @Input() set data(data: { [key in string]: number; }) {
    this._data = data;
    this._updateChart();
  }

  @Input() set studentData(data: { [key in string]: number; }) {
    this._studentData = data;
    this._updateChart();
  }

  @Input() set viewAverage(on: boolean) {
    this._viewAverage = on;
    this._updateChart();
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get X(): string[] {
    return Object.keys(this._data);
  }

  get Y(): number[] {
    if (this._viewAverage) {
      return Object.keys(this._data).map(key => this._data[key] / (this._studentData[key] || 1));
    }
    return Object.keys(this._data).map(key => this._data[key]);
  }

  ngOnInit(): void {
    const colors = this._chartColorService.getColors(this.Y.length);

    this.chartConfig = {
      type: 'bar',
      data: {
        labels: this.X,
        datasets: [{
          type: 'bar',
          data: this.Y,
          backgroundColor: colors,
          borderColor: colors,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: number) => value % 1 === 0 ? value : ''
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: this.title,
            font: {
              size: 15
            }
          },
          datalabels: {
            font: {
              size: 12,
              weight: 'bold'
            },
            color: '#424242',
            formatter: (value) => Number(value.toFixed(1)).toLocaleString('ko-KR'),
          },
          tooltip: {
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            footerFont: { size: 12 },
          },
        }
      }
    };
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, this.chartConfig);
  }

  private _updateChart(): void {
    if (!this.chart) {
      return;
    }


    setTimeout(() => {
      const colors = this._chartColorService.getColors(this.Y.length);
      this.chart.data.labels = this.X;
      this.chart.data.datasets[0].data = this.Y;
      this.chart.data.datasets[0].backgroundColor = colors;
      this.chart.data.datasets[0].borderColor = colors;
      this.chart.update();
    }, 0);
  }
}
