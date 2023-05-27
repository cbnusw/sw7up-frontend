import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartColorService } from '../../../../services/chart-color.service';
import { StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';

@Component({
  selector: 'sw-topcit-subjects-chart',
  templateUrl: './topcit-subjects-chart.component.html',
  styleUrls: ['./topcit-subjects-chart.component.scss']
})
export class TopcitSubjectsChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() topcit: StudentTopcitDto;
  @Input() topcitStats: TopcitStatDto[] = [];
  @Input() student: StudentDto;

  chart: Chart;
  chartConfig: ChartConfiguration;
  labels: string[] = [];
  selected = '전국';

  constructor(private _chartColorService: ChartColorService) {
  }

  get tobOptions(): string[] {
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

  _updateLabels(): void {
    this.labels = this.topcit.subjects.map(({ name }) => name).sort();
  }

  ngOnInit(): void {
    this._updateLabels();
    console.log(this.student.name);

    this.chartConfig = {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.student.name,
          data: this.labels.map(label => this.topcit.subjects.find(({ name }) => label === name).score),
          backgroundColor: this._chartColorService.getColors(this.labels.length)[0],
          borderColor: this._chartColorService.getColors(this.labels.length, 1)[0],
        }, {
          label: this.selected,
          data: this.labels.map(
            label => this.topcitStats.find(({ category }) => category === this.selected).subjects.find(({ name }) => name === label).score
          ),
          backgroundColor: this._chartColorService.getColors(this.labels.length)[0],
          borderColor: this._chartColorService.getColors(this.labels.length, 1)[0],
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
}
