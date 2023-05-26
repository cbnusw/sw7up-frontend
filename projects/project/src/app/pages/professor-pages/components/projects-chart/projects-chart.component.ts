import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
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
  chart: Chart;
  chartConfig: ChartConfiguration;

  private _data: { [key in SemesterBase]: number; };
  private _averages: { [key in SemesterBase]: number; };

  constructor() {
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  @Input() set data(data: { [key in SemesterBase]: number; }) {
    this._data = data;
    this._updateChart();
  }

  // get data(): { [key in SemesterBase]: number; } {
  //   return this._data;
  // }

  @Input() set averages(data: { [key in SemesterBase]: number; }) {
    this._averages = data;
    this._updateChart();
  }

  get averageData(): number[] {
    return Object.keys(this._averages).sort().map(key => this._averages[key]);
  }

  get labels(): string[] {
    return Object.keys(this._averages).sort().map(key => this._convertLabels(key));
  }

  get myData(): number[] {
    return Object.keys(this._averages).map(key => {
      return this._data[key] || 0;
    });
  }

  ngOnInit(): void {
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          type: 'line',
          label: `${this.student.name}`,
          data: this.myData,
          // backgroundColor: this._chartColorService.getColors(data.length),
        }, {
          type: 'bar',
          label: '전체 평균',
          data: this.averageData,
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
              size: 15,
              weight: 'bold'
            },
            color: '#fff',
            formatter: (value) => Number(value).toLocaleString('ko-KR'),
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

  private _convertLabels(key): string {
    const [grade, semester] = key.split('-');
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

  private _updateChart(): void {
    if (!this.chart) {
      return;
    }

    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.myData;
    this.chart.data.datasets[1].data = this.averageData;
    this.chart.update();
  }
}
