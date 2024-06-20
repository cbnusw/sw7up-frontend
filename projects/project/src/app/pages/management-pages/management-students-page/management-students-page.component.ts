/* tslint:disable:no-string-literal */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { WorkSheet } from 'xlsx';
import { ISelectOption } from '../../../types';
import { RegisterStudentDto, StudentManagementService } from './services/student-management.service';

@Component({
  selector: 'sw-management-students-page',
  templateUrl: './management-students-page.component.html',
  styleUrls: ['./management-students-page.component.scss']
})
export class ManagementStudentsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;

  pending = false;
  clear = false;
  options: ISelectOption[] = [
    { viewValue: '업데이트', value: false },
    { viewValue: '초기화', value: true },
  ];

  private _subject: Subject<RegisterStudentDto[]> = new Subject<RegisterStudentDto[]>();
  private _subscription = new Subscription();
  private readonly _EXCEL_FIELDS = ['교번', '교수명', '학과', '학번', '학생명', '학년'];
  private readonly _INVALID_EXCEL_MESSAGE = `잘못된 형식의 엑셀파일입니다.\n엑셀 파일의 각 시트에는 다음의 필드가 포함되어야 합니다.\n${this._EXCEL_FIELDS.join(', ')}`;

  constructor(readonly service: StudentManagementService) {
  }

  register(): void {
    this.fileInputRef?.nativeElement.click();
  }

  ngOnInit(): void {
    this._subscription.add(
      this._subject.asObservable().pipe(
        tap(() => this.pending = true),
        switchMap(dto => this.service.registerStudents(dto, this.clear)),
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

  private _validate(rows: any[]): boolean {
    for (const row of rows) {
      const keys = Object.keys(row);
      const valid = this._EXCEL_FIELDS.every(k => keys.includes(k));
      if (!valid) {
        const invaliedDataMsg = this._EXCEL_FIELDS.map(k => ` - ${k}: ${row[k] ? row[k] : '미입력'}`).join('\n');
        alert(`${this._INVALID_EXCEL_MESSAGE}\n\n잘못 입력된 정보:\n${invaliedDataMsg}`);
        return false;
      }
    }
    return true;
  }

  private _map(rows: any[]): RegisterStudentDto[] {
    return rows.map((row: any) => ({
      professor: {
        no: row['교번'],
        name: row['교수명'],
        department: row['학과'],
      },
      student: {
        no: row['학번'],
        name: row['학생명'],
        department: row['학과'],
        grade: row['학년'] || null,
        note: row['비고'] || null,
      },
    }));
  }
}
