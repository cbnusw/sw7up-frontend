/* tslint:disable:no-string-literal */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { WorkSheet } from 'xlsx';
import { ISelectOption } from '../../../types';
import { RegisterStepUpDto, StepUpManagementService } from './services/step-up-management.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'sw-management-step-up-page',
  templateUrl: './management-step-up-page.component.html',
  styleUrls: ['./management-step-up-page.component.scss']
})
export class ManagementStepUpPageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;

  pending = false;
  clear = false;

  private _subject: Subject<RegisterStepUpDto[]> = new Subject<RegisterStepUpDto[]>();
  private _subscription = new Subscription();
  private readonly _EXCEL_FIELDS = ['학과', '학번', '이름', '수준', '등록일'];
  private readonly _INVALID_EXCEL_MESSAGE = `잘못된 형식의 엑셀 파일입니다.\n엑셀 파일의 각 시트에는 다음의 필드가 포함되어야 합니다.\n${this._EXCEL_FIELDS.join(', ')}`;

  options: ISelectOption[] = [
    { viewValue: '업데이트', value: false },
    { viewValue: '초기화', value: true },
  ];

  constructor(public readonly service: StepUpManagementService) {
  }

  register(): void {
    this.fileInputRef?.nativeElement.click();
  }

  ngOnInit(): void {
    this._subscription.add(
      this._subject.asObservable().pipe(
        tap(() => this.pending = true),
        switchMap(dto => this.service.registerStepUpData(dto, this.clear)),
      ).subscribe({
        next: () => {
          this.pending = false;
          alert('등록이 완료되었습니다.');
        },
        error: err => {
          console.error(err);
          this.pending = false;
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.fileInputRef.nativeElement.addEventListener('change', (event) => {
      const file = (event as any).target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result;
        const workBook = XLSX.read(data, { type: 'binary' });
        let rows = [];

        try {
          workBook.SheetNames.forEach(sheetName => {
            const sheet = workBook.Sheets[sheetName];
            rows = [...rows, ...this._sheetToJSON(sheet)];
          });

          if (!this._validate(rows)) {
            alert(this._INVALID_EXCEL_MESSAGE);
            return;
          }
          this._subject.next(this._map(rows));
        } catch (e) {
          alert(this._INVALID_EXCEL_MESSAGE);
          return;
        }
        this.fileInputRef.nativeElement.value = '';
      };

      reader.readAsBinaryString(file);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _sheetToJSON(sheet: WorkSheet): any[] {
    return XLSX.utils.sheet_to_json(sheet, { raw: false }).map((row: any) => {
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

  private _validate(rows: any[]): boolean {
    return rows.map(row => Object.keys(row)).every(_keys => this._EXCEL_FIELDS.every(k => _keys.includes(k)));
  }

  private _map(rows: any[]): RegisterStepUpDto[] {
    const pattern = /(\d{4}).+(\d{1,2}).+(\d{1,2})/;
    return rows.map((row: any) => {
      const [, year, month, date] = row['등록일'].match(pattern);

      return {
        department: row['학과'],
        no: row['학번'],
        name: row['이름'],
        level: row['수준'],
        registeredAt: dayjs(`${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`).toDate()
      };
    });
  }
}
