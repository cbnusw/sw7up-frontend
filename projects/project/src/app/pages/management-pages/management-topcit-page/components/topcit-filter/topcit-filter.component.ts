import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISelectOption } from '../../../../../types';
import { TopcitManagementService } from '../../services/topcit-management.service';

@Component({
  selector: 'sw-topcit-filter',
  templateUrl: './topcit-filter.component.html',
  styleUrls: ['./topcit-filter.component.scss']
})
export class TopcitFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('filterHeader') filterHeader?: ElementRef;
  @ViewChild('filterBody') filterBody?: ElementRef;
  @HostBinding('style.height') height = 'auto';

  year: number = null;
  yearOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  no: number = null;
  noOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  level: number = null;
  levelOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  department: string = null;
  departmentOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  grade: string = null;
  gradeOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  studentNo: string = null;
  studentName: string = null;
  studentOptions: ISelectOption[] = [{ value: '이름' }, { value: '학번' }];
  studentOption = this.studentOptions[0].value;

  private _collapsed = true;
  private readonly _subscription = new Subscription();

  constructor(private readonly _service: TopcitManagementService) {
  }

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(collased: boolean) {
    this._collapsed = collased;
    this._calculateHeight();
  }

  changeStudentOption(option: string): void {
    this.studentNo = this.studentName = null;
    this.studentOption = option;
  }

  initQuery(): void {
    this.year = null;
    this.no = null;
    this.level = null;
    this.department = null;
    this.grade = null;
    this.studentNo = null;
    this.studentName = null;

    this.search();
  }

  search(): void {
    this._service.search({
      year: this.year,
      no: this.no,
      level: this.level,
      department: this.department,
      grade: this.grade,
      studentNo: this.studentNo,
      studentName: this.studentName
    });
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.search();
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
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.years$.subscribe(list => this.yearOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ viewValue: `${value}년`, value }))
      ])
    );

    this._subscription.add(
      this._service.noList$.subscribe(list => this.noOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ viewValue: `${value}회`, value }))
      ])
    );

    this._subscription.add(
      this._service.levels$.subscribe(list => this.levelOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );

    this._subscription.add(
      this._service.departments$.subscribe(list => this.departmentOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );

    this._subscription.add(
      this._service.grades$.subscribe(list => this.gradeOptions = [
        { viewValue: '전체', value: null },
        ...list.map(value => ({ value }))
      ])
    );
  }
}
