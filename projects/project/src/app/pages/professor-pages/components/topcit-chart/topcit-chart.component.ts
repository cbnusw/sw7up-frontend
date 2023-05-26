import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';
import { StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';

@Component({
  selector: 'sw-topcit-chart',
  templateUrl: './topcit-chart.component.html',
  styleUrls: ['./topcit-chart.component.scss']
})
export class TopcitChartComponent implements AfterViewInit, OnInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() topcit: StudentTopcitDto;
  @Input() topcitStats: TopcitStatDto[] = [];
  @Input() student: StudentDto;

  chart: Chart;
  chartConfig: ChartConfiguration;

  selected = '총점';

  constructor(private _chartColorService: ChartColorService) {
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get tobOptions(): string[] {
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
          }
        },
        plugins: {
          legend: {
            display: false,
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
