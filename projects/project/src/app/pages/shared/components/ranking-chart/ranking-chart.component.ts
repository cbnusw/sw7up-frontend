import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { RankingDto } from '../../services';
import { ChartColorService } from '../../../../services/chart-color.service';

@Component({
  selector: 'sw-ranking-chart',
  templateUrl: './ranking-chart.component.html',
  styleUrls: ['./ranking-chart.component.scss'],
})
export class RankingChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;

  chart: Chart;
  chartConfig: ChartConfiguration;

  private _rankingData: RankingDto[] = [];

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  constructor(
    private readonly _chartColorService: ChartColorService,
  ) {
  }

  @Input()
  set rankingData(data: RankingDto[]) {
    this._rankingData = data;
    this._updateChart();
  }

  get labels(): string[] {
    return this._rankingData.map(item => {
      const { student } = item;
      return `${student.department} ${student.name}`;
    });
  }

  get data(): number[] {
    return this._rankingData.map(item => item.count);
  }

  ngOnInit(): void {
    const color = this._chartColorService.getColors(this.labels.length);
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: color,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value: number) => value % 1 === 0 ? value : ''
            }
          },
          y: {
            grid: { display: false }
          }
        },
        plugins: {
          title: {
            display: true,
            position: 'bottom',
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
          legend: {
            display: false,
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

    const color = this._chartColorService.getColors(this.labels.length);
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.data;
    this.chart.data.datasets[0].backgroundColor = color;
    this.chart.update();
  }
}
