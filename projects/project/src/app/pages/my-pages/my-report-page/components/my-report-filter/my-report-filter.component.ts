import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { ISelectOption } from '../../../../../types';
import { MyReportService } from '../../services/my-report.service';

@Component({
  selector: 'sw-my-report-filter',
  templateUrl: './my-report-filter.component.html',
  styleUrls: ['./my-report-filter.component.scss']
})
export class MyReportFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('filterHeader') filterHeader?: ElementRef;
  @ViewChild('filterBody') filterBody?: ElementRef;
  @HostBinding('style.height') height = 'auto';

  startCreatedAt: Date | null = null;
  endCreatedAt: Date | null = null;
  startGrade: number | null = null;
  endGrade: number | null = null;
  startPerformedAt: string | null = null;
  endPerformedAt: string | null = null;

  createdAtOption = false;
  createdAtOptions: ISelectOption[] = [
    { viewValue: '전체', value: false },
    { viewValue: '기간설정', value: true },
  ];

  startYear: number | null = null;
  startSemester: number | null = null;
  endYear: number | null = null;
  endSemester: number | null = null;
  yearOptions: ISelectOption[];
  semesterOptions: ISelectOption[] = [
    { viewValue: '1학기', value: 0 },
    { viewValue: '여름학기', value: 1 },
    { viewValue: '2학기', value: 2 },
    { viewValue: '겨울학기', value: 3 },
  ];
  gradeOptions: ISelectOption[];

  private _collapsed = true;
  private _subscription = new Subscription();

  constructor(private readonly _service: MyReportService) {
    const year = dayjs().year();
    this.yearOptions = Array.from({ length: 10 }).map((_, i) => {
      const value = year - i;
      return { viewValue: `${value}년`, value };
    });
    this.gradeOptions = Array.from({ length: 6 }).map((_, i) => {
      const value = i + 1;
      return { viewValue: `${value}학년`, value };
    });
  }

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(collased: boolean) {
    this._collapsed = collased;
    this._calculateHeight();
  }

  changeCreatedAtOption(option: boolean): void {
    this.createdAtOption = option;
    this.startCreatedAt = null;
    this.endCreatedAt = null;
  }

  initQuery(): void {
    this.startCreatedAt = null;
    this.endCreatedAt = null;
    this.startGrade = null;
    this.endGrade = null;
    this.startPerformedAt = null;
    this.endPerformedAt = null;
    this.startYear = null;
    this.endYear = null;
    this.startSemester = null;
    this.endSemester = null;
    this.createdAtOption = false;
    this.getReport();
  }

  getReport(): void {
    this.startPerformedAt = this.startYear ? [this.startYear, this.startSemester || 0].join('-') : null;
    this.endPerformedAt = this.endYear ? [this.endYear, this.endSemester || 3].filter(v => !!v).join('-') : null;
    const query = {
      startCreatedAt: this.startCreatedAt,
      endCreatedAt: this.endCreatedAt,
      startPerformedAt: this.startPerformedAt,
      endPerformedAt: this.endPerformedAt,
      startGrade: this.startGrade,
      endGrade: this.endGrade,
    };
    this._service.getReport(query);
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.getReport();
    this._subscribe();
  }

  ngAfterViewInit(): void {
    this._calculateHeight();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _calculateHeight(): void {
    setTimeout(() => {
      if (this.filterHeader && this.filterBody) {
        const height = this.filterHeader.nativeElement.clientHeight + (this.collapsed ? 0 : this.filterBody.nativeElement.clientHeight);
        this.height = height + 'px';
      } else {
        this.height = 'auto';
      }
    }, 0);
  }

  private _subscribe(): void {
  }
}
