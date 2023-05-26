import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
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
  @Input() student: StudentDto;
  @Input() title: string;
  @Input() data: { [key in SemesterBase]: number; };
  @Input() averages: { [key in SemesterBase]: number; };

  chart: Chart;
  chartConfig: ChartConfiguration;

  private readonly _GRADE_SEMESTERS = [
    '1-0', '1-1', '1-2', '1-3',
    '2-0', '2-1', '2-2', '2-3',
    '3-0', '3-1', '3-2', '3-3',
    '4-0', '4-1', '4-2', '4-3',
    '5-0', '5-1', '5-2', '5-3',
    '6-0', '6-1', '6-2', '6-3',
  ];

  // private _data: { [key in SemesterBase]: number; };
  // private _averages: { [key in SemesterBase]: number; };

  constructor(private _chartColorService: ChartColorService) {
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get averageData(): number[] {
    return this.labels.map(v => this.averages[v] || 0);
  }

  get labels(): string[] {
    const lbs: string[] = Object.keys(this.data).sort();
    let start = this._GRADE_SEMESTERS.indexOf(lbs[0]);
    let end = this._GRADE_SEMESTERS.indexOf(lbs[lbs.length - 1]);
    start = ['1', '3'].includes(this._GRADE_SEMESTERS[start].split('-')[1]) ? start + 1 : start;
    end = ['0', '2'].includes(this._GRADE_SEMESTERS[end].split('-')[1]) ? end + +2 : end + 1;
    return this._GRADE_SEMESTERS.slice(start, end);
  }

  get myData(): number[] {
    return this.labels.map(v => this.data[v] || 0);
  }

  ngOnInit(): void {
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

  updateChart(): void {
    if (!this.chart) {
      return;
    }

    this.chart.data.labels = this.labels.map(v => this._convertLabels(v));
    this.chart.data.datasets[0].data = this.myData;
    this.chart.data.datasets[1].data = this.averageData;
    this.chart.update();
  }
}
