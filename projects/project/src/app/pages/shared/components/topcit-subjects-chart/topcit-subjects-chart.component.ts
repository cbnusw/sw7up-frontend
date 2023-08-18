import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';
import { StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../../../types';

@Component({
  selector: 'sw-topcit-subjects-chart',
  templateUrl: './topcit-subjects-chart.component.html',
  styleUrls: ['./topcit-subjects-chart.component.scss']
})
export class TopcitSubjectsChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() student: StudentDto;

  chart: Chart;
  chartConfig: ChartConfiguration;
  labels: string[] = [];
  selected = '전국';
  colors: string[];

  private _topcit: StudentTopcitDto;
  private _topcitStats: TopcitStatDto[] = [];

  constructor(private _chartColorService: ChartColorService) {
    this.colors = this._chartColorService.getColors(2);
  }

  @Input() set topcit(topcit: StudentTopcitDto) {
    this._topcit = topcit;
    this._updateLabels();
    this._updateChart();
  }

  get topcit(): StudentTopcitDto {
    return this._topcit;
  }

  @Input() set topcitStats(stats: TopcitStatDto[]) {
    this._topcitStats = stats;
    this._updateLabels();
    this._updateChart();
  }

  get topcitStats(): TopcitStatDto[] {
    return this._topcitStats;
  }

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  get tabOptions(): string[] {
    return this.topcitStats.map(({ category }) => category).sort((a, b) => {
      if (a === '전국') {
        return -1;
      }
      if (b === '전국') {
        return 1;
      }
      if (a === '학교') {
        return -1;
      }
      if (b === '학교') {
        return 1;
      }
      return a < b ? -1 : 1;
    });
  }

  ngOnInit(): void {
    this._updateLabels();

    this.chartConfig = {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.student.name,
          data: this.labels.map(label => this.topcit.subjects.find(({ name }) => label === name).score),
          backgroundColor: this.colors[0],
          borderColor: this.colors[0],
        }, {
          label: this.selected,
          data: this.labels.map(
            label => this.topcitStats.find(({ category }) => category === this.selected).subjects.find(({ name }) => name === label).score
          ),
          backgroundColor: this.colors[1],
          borderColor: this.colors[1],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: { display: false },
          y: { display: false }
        },
        plugins: {
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

  changeTabOption(option: string): void {
    this.selected = option;
    this.chart.data.datasets[1].label = this.selected;
    this.chart.data.datasets[1].data = this.labels.map(
      label => this.topcitStats.find(({ category }) => category === this.selected).subjects.find(({ name }) => name === label).score
    );
    this.chart.update();
  }

  private _updateLabels(): void {
    this.labels = this.topcit.subjects.map(({ name }) => name).sort();
  }

  private _updateChart(): void {
    if (!this.chart) {
      return;
    }
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.labels.map(label => this.topcit.subjects.find(({ name }) => label === name).score);
    this.chart.data.datasets[1].data = this.labels.map(
      label => this.topcitStats.find(({ category }) => category === this.selected).subjects.find(({ name }) => name === label).score
    );
    this.chart.update();
  }
}
