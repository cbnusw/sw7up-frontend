import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import * as dayjs from 'dayjs';
import { ChartColorService } from '../../../../services/chart-color.service';
import { SemesterBase } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';

@Component({
  selector: 'sw-projects-chart',
  templateUrl: './projects-chart.component.html',
  styleUrls: ['./projects-chart.component.scss']
})
export class ProjectsChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() year: number;
  @Input() student: StudentDto;
  @Input() title: string;
  @Input() data: { [key in SemesterBase]: number; };
  @Input() averages: { [key in SemesterBase]: number; };

  chart: Chart;
  chartConfig: ChartConfiguration;
  labels: string[] = [];

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

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get averageData(): number[] {
    return this.labels.map(v => this.averages[v] || 0);
  }

  get myData(): number[] {
    return this.labels.map(v => this.data[v] || 0);
  }

  updateChart(): void {
    if (!this.chart) {
      return;
    }

    this._updateLabels();
    setTimeout(() => {
      // this._log('프로젝트 수');
      this.chart.data.labels = this.labels.map(v => this._convertLabels(v));
      this.chart.data.datasets[0].data = this.myData;
      this.chart.data.datasets[1].data = this.averageData;
      this.chart.update();
    }, 0);
  }

  ngOnInit(): void {
    this._updateLabels();
    // this._log('프로젝트 수');
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: this.labels.map(v => this._convertLabels(v)),
        datasets: [{
          type: 'line',
          label: `${this.student.name}`,
          data: this.myData,
          backgroundColor: this._chartColorService.getColors(this.myData.length)[0],
        }, {
          type: 'bar',
          label: '전체 평균',
          data: this.averageData,
          backgroundColor: this._chartColorService.getColors(this.averageData.length)
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
          }
        },
        plugins: {
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

  private _convertLabels(value): string {
    const [grade, semester] = value.split('-');
    if (+semester === 0) {
      return `${grade}학년 1학기`;
    } else if (+semester === 1) {
      return `${grade}학년 여름학기`;
    } else if (+semester === 2) {
      return `${grade}학년 2학기`;
    } else {
      return `${grade}학년 겨울학기`;
    }
  }

  private _updateLabels(): void {
    // this._log('프로젝트 수');
    const now = dayjs();
    const [year, month] = [now.year(), now.month() + 1];
    const endOffset = this.year !== year ? 4 : [1, 2, 3, 4][[6, 9, 12, 9999].findIndex(m => m > month)];
    const lbs: string[] = Object.keys(this.data).sort();
    let start = this._GRADE_SEMESTERS.indexOf(lbs[0]);
    let end = this._GRADE_SEMESTERS.indexOf(lbs[lbs.length - 1]);
    start -= +(this._GRADE_SEMESTERS[start].split('-')[1]);
    end += Math.max(endOffset - +(this._GRADE_SEMESTERS[end].split('-')[1]), 1);
    this.labels = this._GRADE_SEMESTERS.slice(start, end);
  }

  private _log(title: string): void {
    if (this.title === title) {
      const now = dayjs();
      console.log(now.year(), now.month() + 1);
      console.log(this.year);
      console.log(this.labels);
      console.log(this.data);
      console.log(this.averages);
      console.log(this.myData);
      console.log(this.averageData);
      console.log('-----------------------');
    }
  }
}
