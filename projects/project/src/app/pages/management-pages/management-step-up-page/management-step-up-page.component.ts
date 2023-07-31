/* tslint:disable:no-string-literal */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { sheetToJSON, toNumber } from '../../../tools';
import { ISelectOption, SEMESTERS, TSemesterIndex } from '../../../types';
import { RegisterStepUpDto, StepUpManagementService } from './services/step-up-management.service';

@Component({
  selector: 'sw-management-step-up-page',
  templateUrl: './management-step-up-page.component.html',
  styleUrls: ['./management-step-up-page.component.scss']
})
export class ManagementStepUpPageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;

  pending = false;
  clear = false;
  options: ISelectOption[] = [
    { viewValue: '업데이트', value: false },
    { viewValue: '초기화', value: true },
  ];

  private readonly _subject: Subject<RegisterStepUpDto[]> = new Subject<RegisterStepUpDto[]>();
  private readonly _subscription = new Subscription();
  private readonly _EXCEL_FIELDS = ['년도', '학기', 'LEVEL', '결과', '학과', '학번', '학년', '이름'];
  private readonly _INVALID_EXCEL_MESSAGE = `잘못된 형식의 엑셀 파일입니다.\n엑셀 파일의 각 시트에는 다음의 필드가 포함되어야 합니다.\n${this._EXCEL_FIELDS.join(', ')}`;

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
            rows = [...rows, ...sheetToJSON(sheet)];
          });

          if (!this._validate(rows)) {
            alert(this._INVALID_EXCEL_MESSAGE);
            return;
          }
          this._subject.next(this._mapToStepUpData(rows));
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

  private _validate(rows: any[]): boolean {
    return rows.map(row => Object.keys(row)).every(_keys => this._EXCEL_FIELDS.every(k => _keys.includes(k)));
  }

  private _mapToStepUpData(rows: any[]): RegisterStepUpDto[] {
    const result: RegisterStepUpDto[] = [];
    rows.map<RegisterStepUpDto>(row => ({
      performedAt: `${row['년도'] as number}-${SEMESTERS.map(s => s.replace('학기', '').trim()).indexOf(`${row['학기']}`.replace('학기', '').trim()) as TSemesterIndex}`,
      level: toNumber(row['LEVEL']),
      pass: ['P', 'PASS'].includes(row['결과']),
      department: row['학과'],
      no: row['학번'],
      grade: toNumber(row['학년'].replace('학년', '')),
      name: row['이름'],
      subjects: Object.keys(row)
        .filter(key => key !== '순번' && key !== '정답수' && !this._EXCEL_FIELDS.includes(key))
        .map(name => ({
          name,
          score: toNumber(row[name])
        }))
    })).forEach((row: RegisterStepUpDto) => {
      const idx = result.findIndex(dto => dto.performedAt === row.performedAt && dto.no === row.no);
      idx !== -1 ? result[idx] = row : result.push(row);
    });

    return result;
  }
}
