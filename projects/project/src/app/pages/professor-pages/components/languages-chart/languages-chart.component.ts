import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ITabOption } from '../../../../common/controls/components';
import { ChartColorService } from '../../../../services/chart-color.service';
import { LanguagesDto } from '../../../../services/stat.service';

@Component({
  selector: 'sw-languages-chart',
  templateUrl: './languages-chart.component.html',
  styleUrls: ['./languages-chart.component.scss']
})
export class LanguagesChartComponent implements AfterViewInit, OnInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() data: LanguagesDto;
  chart: Chart;
  chartConfig: ChartConfiguration;
  chartOptions: ITabOption[] = [
    { viewValue: '프로젝트 수', value: 'projects' },
    { viewValue: '파일 수', value: 'files' },
    { viewValue: '코드라인 수', value: 'codes' },
    { viewValue: '주석라인 수', value: 'comments' },
  ];
  chartOption: ITabOption = this.chartOptions[0];

  @HostListener('window:resize') handleResize(): void {
    this.chart?.resize();
  }

  constructor(private _chartColorService: ChartColorService) {
  }

  ngOnInit(): void {
    const { labels, data } = this._getData(this.chartOption.value);
    this.chartConfig = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: this._getLabel(this.chartOption.value),
          data,
          backgroundColor: this._chartColorService.getColors(data.length),
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

  private _getData(key: keyof LanguagesDto): { labels: string[]; data: number[] } {
    const labels = Object.keys(this.data[key]).sort();
    const data = labels.map(label => this.data[key][label]);
    return { labels, data };
  }

  private _getLabel(key: keyof LanguagesDto): string {
    switch (key) {
      case 'projects':
        return '프로젝트 수';
      case 'files':
        return '파일 수';
      case 'codes':
        return '코드 라인 수';
      case 'comments':
        return '주석 라인 수';
      default:
        return '';
    }
  }

  changeChartOption(option: ITabOption): void {
    this.chartOption = option;
    const { labels, data } = this._getData(this.chartOption.value);
    const label = this._getLabel(this.chartOption.value);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0] = { data, label, backgroundColor: this._chartColorService.getColors(data.length) };
    this.chart.update();
  }
}
