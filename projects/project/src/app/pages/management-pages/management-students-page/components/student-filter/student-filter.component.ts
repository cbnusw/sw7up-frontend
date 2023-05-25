import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISelectOption } from '../../../../../types';
import { StudentManagementService } from '../../services/student-management.service';

@Component({
  selector: 'sw-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss'],
})
export class StudentFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('filterHeader') filterHeader?: ElementRef;
  @ViewChild('filterBody') filterBody?: ElementRef;
  @HostBinding('style.height') height = 'auto';

  professorNo: string = null;
  professorName: string = null;
  professorOptions: ISelectOption[] = [{ value: '이름' }, { value: '교번' }];
  professorOption = this.professorOptions[0].value;

  studentNo: string = null;
  studentName: string = null;
  studentOptions: ISelectOption[] = [{ value: '이름' }, { value: '학번' }];
  studentOption = this.studentOptions[0].value;
  department: string = null;
  departmentOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];

  private _collapsed = true;
  private _subscription = new Subscription();

  constructor(private readonly _service: StudentManagementService) {
  }

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(collased: boolean) {
    this._collapsed = collased;
    this._calculateHeight();
  }

  changeProfessorOption(option: string): void {
    this.professorNo = this.professorName = null;
    this.professorOption = option;
  }

  changeStudentOption(option: string): void {
    this.studentNo = this.studentName = null;
    this.studentOption = option;
  }

  initQuery(): void {
    this.department = null;
    this.professorNo = null;
    this.professorName = null;
    this.studentNo = null;
    this.studentName = null;
    this.search();
  }

  search(): void {
    this._service.search({
      department: this.department,
      professorNo: this.professorNo,
      professorName: this.professorName,
      studentNo: this.studentNo,
      studentName: this.studentName,
    });
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.search();
    this._subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._calculateHeight();
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
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.departments$.subscribe(departments => {
        this.departmentOptions = [{ viewValue: '전체', value: null }, ...departments.map(value => ({ value }))];
      })
    );
  }
}
