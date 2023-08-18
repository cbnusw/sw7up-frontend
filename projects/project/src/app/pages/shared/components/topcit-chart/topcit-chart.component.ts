import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';
import { StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../../../types';

@Component({
  selector: 'sw-topcit-chart',
  templateUrl: './topcit-chart.component.html',
  styleUrls: ['./topcit-chart.component.scss']
})
export class TopcitChartComponent implements AfterViewInit, OnInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() student: StudentDto;

  chart: Chart;
  chartConfig: ChartConfiguration;

  selected = '총점';

  private _topcit: StudentTopcitDto;
  private _topcitStats: TopcitStatDto[];

  constructor(private _chartColorService: ChartColorService) {
  }

  @Input() set topcitStats(stats: TopcitStatDto[]) {
    this._topcitStats = stats;
    this._updateChart();
  }

  get topcitStats(): TopcitStatDto[] {
    return this._topcitStats;
  }

  @Input() set topcit(topcit: StudentTopcitDto) {
    this._topcit = topcit;
    this._updateChart();
  }

  get topcit(): StudentTopcitDto {
    return this._topcit;
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get tabOptions(): string[] {
    return ['총점', ...this.topcit?.subjects.map(subject => subject.name)];
  }

  get labels(): string[] {
    return [this.student?.name, ...this.topcitStats?.map(stat => stat.category)];
  }

  get data(): number[] {
    if (this.selected === '총점') {
      return [this.topcit?.totalScore, ...this.topcitStats.map(stat => stat.totalScore)];
    } else {
      return [
        this.topcit?.subjects?.find(sbj => sbj.name === this.selected)?.score || 0,
        ...this.topcitStats.map(stat => stat.subjects.find(sbj => sbj.name === this.selected)?.score || 0)
      ];
    }
  }

  changeTabOption(option: string): void {
    this.selected = option;
    this._updateChart();
  }

  ngOnInit(): void {
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this._chartColorService.getColors(this.data.length),
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
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.data;
    this.chart.data.datasets[0].backgroundColor = this._chartColorService.getColors(this.data.length);
    this.chart.update();
  }
}
