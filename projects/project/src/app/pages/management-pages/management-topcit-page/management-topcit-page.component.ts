/* tslint:disable:no-string-literal */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { WorkSheet } from 'xlsx';
import { ISelectOption } from '../../../types';
import { TopcitDto, TopcitManagementService } from './services/topcit-management.service';
import { TopcitStatManagementService } from './services/topcit-stat-management.service';

@Component({
  selector: 'sw-management-topcit-page',
  templateUrl: './management-topcit-page.component.html',
  styleUrls: ['./management-topcit-page.component.scss']
})
export class ManagementTopcitPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;

  clear = false;
  options: ISelectOption[] = [
    { viewValue: '업데이트', value: false },
    { viewValue: '초기화', value: true },
  ];

  pageOptions: string[] = ['학생정보', '통계'];
  selectedPage = this.pageOptions[0];
  no: number = null;
  noOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];

  private _topcitSubject: Subject<TopcitDto[]> = new Subject<TopcitDto[]>();
  private _statSubject: Subject<any[]> = new Subject<any[]>();
  private _subscription = new Subscription();
  private _topcitPending = false;
  private _statPending = false;
  private readonly _TOPCIT_KEYS = ['년도', '회차', '성명', '학과', '학년', '학번', '수준', '총점'];
  private readonly _STAT_KEYS = ['구분', '년도', '회차', '총점'];
  private readonly _INVALID_EXCEL_MESSAGE = `잘못된 형식의 엑셀 파일입니다.\n첫 번재 시트에는 TOPCIT 과 '전체정보' 및 다음의 필드가 포함되어야 합니다.\n${this._TOPCIT_KEYS.join(', ')}\n두 번째 시트에는 다음의 필드가 필수로 있어야 합니다.\n${this._STAT_KEYS.join(', ')}`;

  private readonly _toNumber = v => !v && +v !== 0 ? null : +(typeof v === 'string' ? v.trim().replace(/,/g, '') : v);

  constructor(public readonly topcitService: TopcitManagementService,
              public readonly statService: TopcitStatManagementService) {
  }

  get pending(): boolean {
    return this._topcitPending || this._statPending;
  }

  changePage(page: string): void {
    this.selectedPage = page;
  }

  changeClear(clear: boolean): void {
    this.no = null;
    this.clear = clear;
  }

  register(): void {
    this.fileInputRef?.nativeElement.click();
  }

  ngOnInit(): void {
    this._subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.fileInputRef.nativeElement.addEventListener('change', (event) => {
      const file = (event as any).target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result;
        const workBook = XLSX.read(data, { type: 'binary' });
        try {
          const topcitSheet = workBook.Sheets[workBook.SheetNames[0]];
          const statSheet = workBook.Sheets[workBook.SheetNames[1]];
          const rows = this._sheetToJSON(topcitSheet);
          const stat = this._sheetToJSON(statSheet);
          if (!this._validateTopcitData(rows) || !this._validateStatData(stat)) {
            alert(this._INVALID_EXCEL_MESSAGE);
            return;
          }
          this._topcitSubject.next(this._mapTopcitData(rows));
          this._statSubject.next(this._mapStatData(stat));
        } catch (e) {
          alert(this._INVALID_EXCEL_MESSAGE);
          return;
        }
        this.fileInputRef.nativeElement.value = '';
      };

      reader.readAsBinaryString(file);
    });
  }

  private _sheetToJSON(sheet: WorkSheet): any[] {
    return XLSX.utils.sheet_to_json(sheet).map((row: any) => {
      Object.keys(row).forEach(key => {
        const k = key.trim().replace(/\s+/g, ' ');
        row[k] = row[key];
        if (k !== key) {
          delete row[key];
        }
      });
      return row;
    });
  }

  private _validateTopcitData(rows: any[]): boolean {
    return rows.map(row => Object.keys(row)).every((_keys) => this._TOPCIT_KEYS.every(k => _keys.includes(k)));
  }

  private _validateStatData(rows: any[]): boolean {
    return rows.map(row => Object.keys(row)).every((_keys) => this._STAT_KEYS.every(k => _keys.includes(k)));
  }

  private _mapTopcitData(rows: any[]): TopcitDto[] {
    return rows.map((row: any) => ({
      no: this._toNumber(row['회차']),
      year: this._toNumber(row['년도']),
      student: {
        department: row['학과'],
        grade: row['학년'],
        no: row['학번'],
        name: row['성명'],
      },
      level: this._toNumber(row['수준']),
      totalScore: this._toNumber(row['총점']),
      subjects: Object.keys(row).filter(key => !this._TOPCIT_KEYS.includes(key)).map(key => ({
        name: key,
        score: this._toNumber(row[key]),
      }))
    }));
  }

  private _mapStatData(rows: any[]): any[] {
    return rows.map((row: any) => ({
      category: row['구분'],
      year: this._toNumber(row['년도']),
      no: this._toNumber(row['회차']),
      totalScore: this._toNumber(row['총점']),
      subjects: Object.keys(row)
        .filter(key => key !== '순번')
        .filter(key => !this._STAT_KEYS.includes(key))
        .map(key => ({
          name: key,
          score: this._toNumber(row[key])
        }))
    }));
  }

  private _subscribe(): void {
    this._subscribeExcelData();
    this._subscribeOptions();
  }

  private _subscribeExcelData(): void {
    this._subscribeTopcitData();
    this._subscribeTopcitStatData();
  }

  private _subscribeTopcitData(): void {
    this._subscription.add(
      this._topcitSubject.asObservable().pipe(
        tap(() => this._topcitPending = true),
        switchMap(data => this.topcitService.registerTopcitData({
          clear: this.clear,
          no: this.no,
          data
        }))
      ).subscribe({
        next: () => {
          this._topcitPending = false;
        },
        error: err => {
          console.error(err);
          this._topcitPending = false;
        }
      })
    );
  }

  private _subscribeTopcitStatData(): void {
    this._subscription.add(
      this._statSubject.asObservable().pipe(
        tap(() => this._statPending = true),
        switchMap(data => this.statService.registerTopcitStatData({
          clear: this.clear,
          no: this.no,
          data
        }))
      ).subscribe({
        next: () => {
          this._statPending = false;
        },
        error: err => {
          console.error(err);
          this._statPending = false;
        },
      })
    );
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this.topcitService.noList$.subscribe(list => this.noOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ viewValue: `${value}회`, value }))])
    );
  }
}
