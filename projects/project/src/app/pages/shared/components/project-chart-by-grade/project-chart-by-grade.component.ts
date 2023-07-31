import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';
import { SemesterBase } from '../../../../services/stat.service';

@Component({
  selector: 'sw-project-chart-by-grade',
  templateUrl: './project-chart-by-grade.component.html',
  styleUrls: ['./project-chart-by-grade.component.scss']
})
export class ProjectChartByGradeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() title: string;

  chart: Chart;
  chartConfig: ChartConfiguration;
  X: string[] = [];
  Y: number[] = [];

  private _data: { [key in SemesterBase]: number; } = {};
  private _studentData: { [key in SemesterBase]: number; } = {};
  private _viewAverage = false;
  private _separateSemester = false;

  private readonly _GRADE_SEMESTERS = [
    '1-0', '1-1', '1-2', '1-3',
    '2-0', '2-1', '2-2', '2-3',
    '3-0', '3-1', '3-2', '3-3',
    '4-0', '4-1', '4-2', '4-3',
    '5-0', '5-1', '5-2', '5-3',
    '6-0', '6-1', '6-2', '6-3',
  ];

  constructor(private _chartColorService: ChartColorService) {
  }

  @Input() set data(data: { [key in SemesterBase]: number; }) {
    this._data = data;
    this._updateChart();
  }

  @Input() set studentData(data: { [key in SemesterBase]: number; }) {
    this._studentData = data;
    this._updateChart();
  }

  @Input() set viewAverage(on: boolean) {
    this._viewAverage = on;
    this._updateChart();
  }

  @Input() set separateSemester(separate: boolean) {
    this._separateSemester = separate;
    this._updateChart();
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  ngOnInit(): void {
    this._convert();
    const colors = this._chartColorService.getColors(this.Y.length);

    this.chartConfig = {
      type: 'line',
      data: {
        labels: this.X,
        datasets: [{
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
      this._convert();
      this.chart.data.labels = this.X;
      this.chart.data.datasets[0].data = this.Y;
      this.chart.data.datasets[0].backgroundColor = colors;
      this.chart.data.datasets[0].borderColor = colors;
      this.chart.update();
    }, 0);
  }

  private _convert(): void {
    const labels = Object.keys(this._data).sort();
    let data: any[] = [];
    let studentData: number[] = [];
    if (labels.length > 0) {
      const [start, end] = [labels[0], labels[labels.length - 1]];
      const startIdx = this._GRADE_SEMESTERS.indexOf(start);
      const endIdx = this._GRADE_SEMESTERS.indexOf(end);
      const semesters = this._GRADE_SEMESTERS.slice(startIdx, endIdx + 1);
      if (this._separateSemester) {
        data = semesters.map(semester => [semester, this._data[semester] || 0]);
        studentData = semesters.map(semester => this._studentData[semester] || 0);
      } else {
        semesters.forEach((key) => {
          const grade = key.split('-')[0];
          const last = data[data.length - 1];
          if (last && last[0] === grade) {
            last[1] += (this._data[key] || 0);
            studentData[studentData.length - 1] += (this._studentData[key] || 0);
          } else {
            data.push([grade, this._data[key] || 0]);
            studentData.push(this._studentData[key] || 0);
          }
        });
      }
    }

    if (this._viewAverage) {
      data = data.map(([s, v], i) => [s, v / (studentData[i] || 1)]);
    }

    this.X = data.map(item => {
      if (this._separateSemester) {
        const [grade, semester] = item[0].split('-');
        if (semester === '0') {
          return `${grade}학년 1학기`;
        } else if (semester === '1') {
          return `${grade}학년 여름학기`;
        } else if (semester === '2') {
          return `${grade}학년 2학기`;
        } else if (semester === '3') {
          return `${grade}학년 겨울학기`;
        } else {
          return '???';
        }
      }
      return `${item[0]}학년`;
    });
    this.Y = data.map(item => item[1]);
  }
}
