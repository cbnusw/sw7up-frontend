import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISelectOption } from '../../../../../types';
import { StepUpManagementService } from '../../services/step-up-management.service';

@Component({
  selector: 'sw-step-up-filter',
  templateUrl: './step-up-filter.component.html',
  styleUrls: ['./step-up-filter.component.scss']
})
export class StepUpFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('filterHeader') filterHeader?: ElementRef;
  @ViewChild('filterBody') filterBody?: ElementRef;
  @HostBinding('style.height') height = 'auto';

  level: number = null;
  levelOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  department: string = null;
  departmentOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];
  studentNo: string = null;
  studentName: string = null;
  studentOptions: ISelectOption[] = [{ value: '이름' }, { value: '학번' }];
  studentOption = this.studentOptions[0].value;

  private _collapsed = true;
  private readonly _subscription = new Subscription();

  constructor(private readonly _service: StepUpManagementService) {
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
    this.level = null;
    this.department = null;
    this.studentNo = null;
    this.studentName = null;

    this.search();
  }

  search(): void {
    this._service.search({
      level: this.level,
      department: this.department,
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
  }
}
